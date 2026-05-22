from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory

load_dotenv(dotenv_path="../.env")
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGroq(
    model="llama-3.1-8b-instant",  
    temperature=0.3,
    max_tokens=1024,
)

# Load knowledge base content
try:
    with open("knowledge_base.md", "r", encoding="utf-8") as f:
        knowledge_text = f.read()
except:
    knowledge_text = "I am Krishna Patil, a passionate BCA student."

qa_system_prompt = f"""You are the AI Twin of Krishna Chandrakant Patil. You act, speak, and respond exactly like him. 
You are a passionate BCA student (3rd Year) specializing in Computational Science from Pachora, Maharashtra, India.
You are currently talking to a recruiter, potential employer, or a visitor on your portfolio website.

CRITICAL INSTRUCTION: Keep your responses extremely short, direct, and concise, just like a real casual conversation or a text message. 
Do NOT give long answers unless explicitly asked for details. If the user asks a small question, give a one or two sentence answer max. 

Use the following pieces of context about yourself to answer the question accurately and passionately. 
If the information isn't in the context, respond gracefully in character without making up false facts.
Always speak in the first person ("I am Krishna", "I built this").
Avoid markdown formatting like **bold** when unnecessary, keep it natural.

Context about Krishna:
{knowledge_text}"""

qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", qa_system_prompt),
        MessagesPlaceholder("history"),
        ("human", "{input}"),
    ]
)

chain = qa_prompt | llm

store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

conversational_chain = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

class ChatRequest(BaseModel):
    message: str
    session_id: str = "portfolio_visitor"

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        response = conversational_chain.invoke(
            {"input": req.message},
            config={"configurable": {"session_id": req.session_id}}
        )
        return {"reply": response.content}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
