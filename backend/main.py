import os  
import uvicorn  
from fastapi import FastAPI, HTTPException  
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
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

        二、20型人格分类示例
        木系日主（甲、乙）
        1. 甲木·生扶型「仁木育林者」
          - 特质：理想主义领袖，包容心强，需团队支持；缺水木易焦虑，宜合作型事业。
        2. 甲木·克泄型「栋木琢金师」
          - 特质：目标导向的开拓者，执行力强，易过度刚硬；需火土金调和，适配高压行业。
        3. 乙木·生扶型「藤蔓协作者」
          - 特质：柔性策略家，善资源整合，依赖外部滋养；缺支持易摇摆，宜咨询、艺术。
        4. 乙木·克泄型「花木修形者」
          - 特质：精致利他者，适应力强，易为迎合他人失去自我；需金火修剪，宜设计、公关。

        火系日主（丙、丁）
        5. 丙火·生扶型「太阳赋能者」
          - 特质：热情领袖，感染力强，易独断；需木火助燃，宜教育、能源领域。
        6. 丙火·克泄型「革新破局者」
          - 特质：冒险型改革家，善打破规则，易冲动；需水土金平衡，宜科技、金融。
        7. 丁火·生扶型「烛火传承者」
          - 特质：细腻的守护者，重传统与细节，易敏感内耗；宜文化、手工艺。
        8. 丁火·克泄型「暗夜洞察者」
          - 特质：深邃的观察者，直觉敏锐，易过度思虑；需金水调和，宜玄学、心理学。

        土系日主（戊、己）
        9. 戊土·生扶型「山岳奠基者」
          - 特质：务实型构建者，重责任与稳定，易固执；需火土生扶，宜建筑、管理。
        10. 戊土·克泄型「尘壤塑形者」
          - 特质：变革型实干家，善资源重组，易陷入琐碎；需木金疏通，宜农业、环保。
        11. 己土·生扶型「田园滋养者」
          - 特质：包容的协调者，善培育他人，易过度付出；宜教育、医疗。
        12. 己土·克泄型「陶土重塑者」
          - 特质：灵活的改革派，善适应变化，易立场模糊；需木金塑形，宜市场、策划。

        金系日主（庚、辛）
        13. 庚金·生扶型「刀斧淬炼者」
          - 特质：果断的决策者，原则性强，易冷酷；需土金支持，宜军警、法律。
        14. 庚金·克泄型「精钢锻造者」
          - 特质：坚韧的挑战者，抗压能力极强，易钻牛角尖；需火水调和，宜工程、竞技。
        15. 辛金·生扶型「珠玉雕琢者」
          - 特质：追求完美的细节控，重品质，易挑剔；需土金生扶，宜珠宝、精密技术。
        16. 辛金·克泄型「柔金流动者」
          - 特质：变通型谈判家，善权衡利弊，易妥协过度；需水木疏导，宜外交、贸易。

        水系日主（壬、癸）
        17. 壬水·生扶型「江河奔腾者」
          - 特质：宏观战略家，格局开阔，易散漫；需金水助势，宜航运、跨国业务。
        18. 壬水·克泄型「湖海调控者」
          - 特质：资源整合大师，善掌控大局，易控制欲过强；需土木疏导，宜政治、水利。
        19. 癸水·生扶型「雨露润泽者」
          - 特质：细腻的共情者，善疗愈人心，易情绪泛滥；需金水生扶，宜心理咨询、文艺。
        20. 癸水·克泄型「冰霜凝华者」
          - 特质：冷静的谋略家，理性至上，易疏离情感；需火土融化，宜科研、数据分析。

        # 职责
        你是一个资深的易学大师。精通命理学，熟读穷通宝鉴、滴天髓、三命通会、子平真诠等命学名著。
        你的角色是算命先生，根据用户给出的个人信息，撰写专业的测算报告。

        # 输出要求
        请根据用户的出生信息，分析其命盘，确定其属于以上20种人格类型中的哪一种，然后生成一份详细的命理分析报告。
        报告格式应遵循如下结构：

        ### [姓名]的「[日主五行]·[喜用类型]｜[人格标签]」分析报告

        #### 一、基础信息
        - 性别：
        - 出生时间：
        - 出生地：
        - 20型人格类型：
        - MBTI：
        - 当前时间：

        #### 二、核心特质解析

        1. 先天命盘画像
        - 日主特性：
        - 月令环境：
        - 喜用类型：
        - MBTI预测对比：

        2. 人格特质
        ✅ 优势：
        ⚠️ 潜在挑战：

        3. 关键趋势
        - 事业：
        - 情感：
        - 财运：
        - 健康：

        请务必生成一份详细、专业且有深度的分析报告，避免泛泛而谈或过于笼统。
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
        print(ai_content)

        # 返回AI生成的分析报告
        return {
            "content": ai_content,
            "reasoning": reasoning_content
        }
    except Exception as e:
        print(f"DeepSeek API 调用失败: {str(e)}")
        raise e

# 修改用户信息接口，使其自动调用命理分析
@app.post("/api/user-info")
async def create_user_info(user_info: UserInfoSchema):
    try:
        print("接收到用户信息:", user_info.model_dump())

        # 调用命理分析函数获取 AI 生成的分析报告
        analysis_result = await get_fortune_analysis(user_info)

        # 构建并返回结果
        report = {
            "name": "匿名用户" if user_info.anonymous else user_info.name,
            "gender": user_info.gender,
            "analysis": analysis_result["content"],  # AI生成的主要内容
            "reasoning": analysis_result["reasoning"]  # 思维推理过程（如果有）
        }

        return {
            "code": 200,
            "message": "用户信息处理成功",
            "data": report
        }
    except Exception as e:
        print(f"处理用户信息失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 保留原有的 fortune-analysis 端点以便直接访问（可选）
@app.post("/api/fortune-analysis")
async def fortune_analysis_endpoint(user_info: UserInfoSchema):
    try:
        analysis_result = await get_fortune_analysis(user_info)
        return {
            "code": 200,
            "message": "命理分析成功生成",
            "data": {
                "name": "匿名用户" if user_info.anonymous else user_info.name,
                "gender": user_info.gender,
                "analysis": analysis_result["content"],
                "reasoning": analysis_result["reasoning"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  

if __name__ == "__main__":  
    uvicorn.run(app, host="0.0.0.0", port=8000)  