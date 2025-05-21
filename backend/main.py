import os  
import uvicorn  
from fastapi import FastAPI, HTTPException  
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from langchain.prompts import PromptTemplate
from volcenginesdkarkruntime import Ark
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

class UserInfoSchema(BaseModel):
    name: str
    gender: str
    birthDate: str
    birthTime: str
    birthPlace: str
    anonymous: bool = False
    mbti: Optional[str] = None

app = FastAPI()

# 配置跨域资源共享(CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 命理分析函数
async def get_fortune_analysis(user_info: UserInfoSchema):
    try:
        # 创建命理分析的提示模板
        fortune_template = """
        # 用户信息
        姓名: {name}
        性别: {gender}
        出生时间: {birth_date} {birth_time}
        出生地点: {birth_place}
        MBTI: {mbti}
        是否匿名: {anonymous}

        # 分析指南
        一、设计逻辑
        1. 维度拆分：
          - 日主：10天干（甲至癸，对应五行+阴阳）。
          - 喜用倾向：分两类——
            - 生扶型：身弱需印比（如木弱用水木）。
            - 克泄型：身强需财官食伤（如木强用火土金）。
          - 组合公式：日主五行（10） × 喜用倾向（2） = 20型人格。
        2. 命名规则：
          - 结合五行意象与现代标签，如：
            - 甲木·生扶型 → 「仁木育林者」
            - 甲木·克泄型 → 「栋木琢金师」

        # 职责
        你是一个资深的易学大师。精通命理学，熟读穷通宝鉴、滴天髓、三命通会、子平真诠等命学名著。
        你的角色是算命先生，根据用户给出的个人信息，撰写专业的测算报告。

        # 输出要求
        请根据用户的出生信息，分析其命盘，确定其属于以上20种人格类型中的哪一种，然后生成一份详细的命理分析报告。
        报告必须以JSON格式输出，格式如下：

        {{
            "basicInfo": {{
                "dayMaster": "日主（如：乙木）",
                "dayMasterType": "日主类型（如：生扶型）",
                "dayMasterDesc": "日主描述（如：藤蔓协作者）",
                "monthMaster": "月令（如：酉金）",
                "monthMasterDesc": "月令描述（如：出生在秋季，正值金属性能量最旺的季节...）"
            }},
            "keyConfigurations": [
                {{
                    "name": "配置名称（如：癸水（智慧雨露））",
                    "description": "配置描述（如：命带"天降甘露"，直觉敏锐...）",
                    "icon": "图标名称（如：fa-tint）"
                }}
            ],
            "personality": {{
                "strengths": [
                    {{
                        "title": "优势标题（如：谋略型领袖）",
                        "description": "优势描述（如：你既有藤蔓的灵活思维...）",
                        "icon": "图标名称（如：fa-crown）"
                    }}
                ],
                "challenges": [
                    {{
                        "title": "挑战标题（如：能量内耗陷阱）",
                        "description": "挑战描述（如：藤蔓需要依附支架生长...）",
                        "icon": "图标名称（如：fa-battery-quarter）"
                    }}
                ]
            }},
            "trends": {{
                "career": {{
                    "title": "事业趋势标题（如：风筝借东风）",
                    "description": "事业趋势描述（如：今年木火能量旺盛...）",
                    "tags": ["标签1", "标签2"]
                }}
            }},
            "recommendations": {{
                "main": "主要建议（如：作为乙木生扶型人格...）",
                "additional": "补充建议（如：预约一对一专业解读...）"
            }}
        }}

        请确保输出的JSON格式完全符合上述结构，不要添加任何额外的说明文字。
        """

        # 创建prompt模板
        prompt = PromptTemplate(
            template=fortune_template,
            input_variables=["name", "gender", "birth_date", "birth_time", "birth_place", "mbti", "anonymous"]
        )

        # 渲染prompt
        formatted_prompt = prompt.format(
            name="匿名用户" if user_info.anonymous else user_info.name,
            gender=user_info.gender,
            birth_date=user_info.birthDate,
            birth_time=user_info.birthTime,
            birth_place=user_info.birthPlace,
            mbti=user_info.mbti or "未知",
            anonymous=str(user_info.anonymous)
        )

        # 使用官方方式调用DeepSeek API
        client = Ark(
            api_key=os.environ.get("ARK_API_KEY"),
            timeout=1800,  # 30分钟超时
        )

        # 调用API获取回答
        api_response = client.chat.completions.create(
            model="deepseek-r1-250120",
            messages=[
                {"role": "user", "content": formatted_prompt}
            ]
        )

        # 正确提取AI生成的内容
        ai_content = api_response.choices[0].message.content

        # 如果存在推理内容，则提取并记录
        reasoning_content = None
        if hasattr(api_response.choices[0].message, 'reasoning_content'):
            reasoning_content = api_response.choices[0].message.reasoning_content
            print("DeepSeek推理过程:", reasoning_content)

        # 记录一些API使用情况的指标（可选）
        if hasattr(api_response, 'usage'):
            print(f"Token使用情况: 提示tokens: {api_response.usage.prompt_tokens}, "
                  f"完成tokens: {api_response.usage.completion_tokens}, "
                  f"总tokens: {api_response.usage.total_tokens}")

        # 解析AI返回的JSON内容
        try:
            import json
            # 清理AI返回的内容，移除开头的空行和换行符
            cleaned_content = ai_content.strip()
            # 如果内容以```json开头，移除它
            if cleaned_content.startswith('```json'):
                cleaned_content = cleaned_content[7:]
            # 如果内容以```结尾，移除它
            if cleaned_content.endswith('```'):
                cleaned_content = cleaned_content[:-3]
            # 再次清理可能存在的空行和换行符
            cleaned_content = cleaned_content.strip()
            
            # 解析JSON
            report_data = json.loads(cleaned_content)
            
            # 移除所有icon字段
            def remove_icons(obj):
                if isinstance(obj, dict):
                    # 创建新的字典，排除icon字段
                    return {k: remove_icons(v) for k, v in obj.items() if k != 'icon'}
                elif isinstance(obj, list):
                    return [remove_icons(item) for item in obj]
                else:
                    return obj
            
            # 移除所有图标
            report_data = remove_icons(report_data)
            
            return report_data
        except json.JSONDecodeError as e:
            print(f"JSON解析失败: {str(e)}")
            print("AI返回的原始内容:", ai_content)
            print("清理后的内容:", cleaned_content)
            raise HTTPException(status_code=500, detail="AI返回的数据格式不正确")

    except Exception as e:
        print(f"DeepSeek API 调用失败: {str(e)}")
        raise e

# 修改用户信息接口，使其自动调用命理分析
@app.post("/api/user-info")
async def create_user_info(user_info: UserInfoSchema):
    try:
        print("接收到用户信息:", user_info.model_dump())

        # 调用命理分析函数获取 AI 生成的分析报告
        report_data = await get_fortune_analysis(user_info)

        return {
            "code": 200,
            "message": "用户信息处理成功",
            "data": report_data
        }
    except Exception as e:
        print(f"处理用户信息失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 保留原有的 fortune-analysis 端点以便直接访问（可选）
@app.post("/api/fortune-analysis")
async def fortune_analysis_endpoint(user_info: UserInfoSchema):
    try:
        report_data = await get_fortune_analysis(user_info)
        return {
            "code": 200,
            "message": "命理分析成功生成",
            "data": report_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":  
    uvicorn.run(app, host="0.0.0.0", port=8000)  