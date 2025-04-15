
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class UserInfoSchema(BaseModel):
    name: str
    gender: str
    birthDate: str
    birthTime: str
    birthPlace: str
    anonymous: bool = False

app = FastAPI()

# 配置跨域资源共享(CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/user-info")
async def create_user_info(user_info: UserInfoSchema):
    try:
        # 这里可以添加数据库存储逻辑
        print("接收到用户信息:", user_info.model_dump())
        
        # 模拟生成报告的逻辑
        report = {
            "name": user_info.name,
            "gender": user_info.gender,
            "analysis": "根据您的出生信息，我们为您生成了详细的命盘分析报告..."
        }
        
        return {
            "code": 200,
            "message": "用户信息处理成功",
            "data": report
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
