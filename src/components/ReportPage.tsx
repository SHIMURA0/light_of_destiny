import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../contexts/UserDataContext';

const ReportPage: React.FC = () => {
    const navigate = useNavigate();
    const { userData } = useUserData();

    // 如果没有用户数据，重定向到表单页
    useEffect(() => {
        if (!userData.name) {
            navigate('/form');
        }
    }, [userData, navigate]);

    // 处理返回事件
    const handleBack = () => {
        navigate('/form');
    };

    // 获取当前日期，用于显示
    const currentDate = new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // 计算显示的姓名
    const displayName = userData.anonymous ? "匿名" : userData.name || "匿名";

    // 格式化生日信息
    const formattedBirthDate = userData.birthDate
        ? new Date(userData.birthDate).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
        : "1999年9月10日";

    const formattedBirthTime = userData.birthTime || "21时";
    const birthPlace = userData.birthPlace || "四川省成都市";

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-[#1a0e33] via-[#2a1347] to-[#120824] text-white overflow-hidden relative">
            {/* 现代紫色粒子背景 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* 渐变光晕 */}
                <div
                    className="absolute w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl animate-pulse top-[10%] left-[5%]"></div>
                <div
                    className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow top-[50%] right-[10%]"></div>
                <div
                    className="absolute w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-3xl animate-pulse-slower bottom-[20%] left-[20%]"></div>

                {/* 几何粒子 */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(100)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-purple-500/10 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 6 + 1}px`,
                                height: `${Math.random() * 6 + 1}px`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 10 + 5}s`
                            }}
                        />
                    ))}
                </div>

                {/* 线性渐变网格 */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(45deg, transparent 25%, rgba(128,0,128,0.05) 25%, rgba(128,0,128,0.05) 50%, transparent 50%, transparent 75%, rgba(128,0,128,0.05) 75%, rgba(128,0,128,0.05) 100%),
                            linear-gradient(-45deg, transparent 25%, rgba(75,0,130,0.05) 25%, rgba(75,0,130,0.05) 50%, transparent 50%, transparent 75%, rgba(75,0,130,0.05) 75%, rgba(75,0,130,0.05) 100%)
                        `,
                        backgroundSize: '40px 40px',
                        // backgroundImage: 'linear-gradient(to right, rgba(128,0,128,0.05), rgba(75,0,130,0.05))'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* 返回按钮 */}
                <button
                    onClick={handleBack}
                    className="mb-4 flex items-center text-purple-300 hover:text-white transition"
                >
                    <ArrowLeft size={16} className="mr-1"/>
                    返回
                </button>

                <header
                    className="bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl p-6 text-center mb-8 relative overflow-hidden">
                    <div
                        className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-xl"></div>
                    <div
                        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-xl"></div>
                    <h1 className="text-4xl font-bold mb-2">命运之光 · 个人命盘分析</h1>
                    <p className="text-purple-300">揭示您的先天特质与2025年关键运势</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* 左侧信息面板 */}
                    <div className="lg:w-1/3">
                        <div
                            className="bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl p-6 sticky top-4">
                            <div className="text-center mb-8 relative">
                                <div
                                    className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                                    <span className="text-4xl font-bold">乙木</span>
                                </div>
                                <h2 className="text-2xl font-semibold mb-1">乙木·生扶型</h2>
                                <p className="text-lg text-purple-300">藤蔓协作者</p>
                                <p className="mt-3 inline-block px-4 py-1 rounded-full bg-purple-800/50 text-sm">
                                    <i className="fas fa-brain mr-1"></i> ENTJ（外倾/直觉/思考/判断）
                                </p>
                            </div>

                            <div className="space-y-5 text-sm">
                                <div className="flex items-center p-3 rounded-lg bg-purple-800/30">
                                    <i className="fas fa-user text-purple-400 w-5"></i>
                                    <span className="text-purple-200 ml-2">姓名：</span>
                                    <span className="ml-auto">{displayName}</span>
                                </div>
                                <div className="flex items-center p-3 rounded-lg bg-purple-800/30">
                                    <i className="fas fa-calendar text-purple-400 w-5"></i>
                                    <span className="text-purple-200 ml-2">出生时间：</span>
                                    <span className="ml-auto">{formattedBirthDate}{formattedBirthTime}</span>
                                </div>
                                <div className="flex items-center p-3 rounded-lg bg-purple-800/30">
                                    <i className="fas fa-map-marker-alt text-purple-400 w-5"></i>
                                    <span className="text-purple-200 ml-2">出生地：</span>
                                    <span className="ml-auto">{birthPlace}</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center mb-3">
                                    <i className="fas fa-hourglass-half text-purple-400 mr-2"></i>
                                    <h3 className="font-medium">当前时间</h3>
                                </div>
                                <div className="text-sm p-4 rounded-lg bg-gradient-to-r from-purple-800 to-indigo-900">
                                    <p className="mb-1">{currentDate}</p>
                                    <p className="text-purple-300">流年乙巳，流月己卯</p>
                                </div>
                            </div>

                            <div className="mt-8 flex space-x-3">
                                <button
                                    className="flex-1 py-2.5 px-2 bg-purple-800/50 hover:bg-purple-700 rounded-lg text-sm font-medium transition">
                                    <i className="fas fa-download mr-1"></i> 保存报告
                                </button>
                                <button
                                    className="flex-1 py-2.5 px-2 bg-purple-800/50 hover:bg-purple-700 rounded-lg text-sm font-medium transition">
                                    <i className="fas fa-share-alt mr-1"></i> 分享
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 右侧内容区域 */}
                    <div className="lg:w-2/3">
                        <div
                            className="bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl p-6 mb-8">
                            {/* 标签切换 */}
                            <TabSection/>
                        </div>

                        {/* 个性化建议 */}
                        <div
                            className="bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2"></div>
                            <div className="p-6">
                                <div className="flex items-center mb-5">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                                        <i className="fas fa-star text-white"></i>
                                    </div>
                                    <h3 className="text-xl font-semibold">个性化建议</h3>
                                </div>
                                <div className="bg-purple-800/30 p-6 rounded-xl">
                                    <p className="text-gray-200 leading-relaxed text-lg">
                                        作为乙木生扶型人格，您适合在3-6月推动新项目，但需注意避免7-8月的过度能量消耗。建议通过冥想或水边散步补充能量，并寻找与"壬水"、"癸水"相关的合作伙伴（具有高共情力、善于倾听的人）以达成事业新突破。
                                    </p>
                                </div>

                                <div
                                    className="mt-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-6 rounded-xl border border-pink-800/30">
                                    <h4 className="font-medium mb-3 flex items-center">
                                        <i className="fas fa-gem text-pink-400 mr-2"></i>
                                        想了解更多？
                                    </h4>
                                    <p className="text-gray-300 mb-5 leading-relaxed">
                                        预约一对一专业解读，深入分析您的命盘与2025年关键机遇点。我们的命理专家将为您提供更详细的个人化指导。
                                    </p>
                                    <button
                                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-sm font-medium transition shadow-lg shadow-purple-900/30 flex items-center justify-center">
                                        <i className="fas fa-calendar-check mr-2"></i> 预约专业解读
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 标签组件
const TabSection = () => {
    const [activeTab, setActiveTab] = React.useState('basic');

    return (
        <>
            <div className="flex border-b border-purple-700/50 mb-8 overflow-x-auto">
                <button
                    className={`px-5 py-3 font-medium text-base whitespace-nowrap focus:outline-none ${activeTab === 'basic' ? 'border-b-2 border-purple-500' : 'text-purple-400'}`}
                    onClick={() => setActiveTab('basic')}
                >
                    <i className="fas fa-compass mr-2"></i>先天命盘画像
                </button>
                <button
                    className={`px-5 py-3 font-medium text-base whitespace-nowrap focus:outline-none ${activeTab === 'personality' ? 'border-b-2 border-purple-500' : 'text-purple-400'}`}
                    onClick={() => setActiveTab('personality')}
                >
                    <i className="fas fa-fingerprint mr-2"></i>人格特质
                </button>
                <button
                    className={`px-5 py-3 font-medium text-base whitespace-nowrap focus:outline-none ${activeTab === 'trends' ? 'border-b-2 border-purple-500' : 'text-purple-400'}`}
                    onClick={() => setActiveTab('trends')}
                >
                    <i className="fas fa-chart-line mr-2"></i>2025年关键趋势
                </button>
            </div>

            {activeTab === 'basic' && (
                <div>
                    <div className="mb-10">
                        <div className="flex items-center mb-4">
                            <div
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2">
                                <i className="fas fa-seedling"></i>
                            </div>
                            <h3 className="text-xl font-semibold">「乙木日主」</h3>
                        </div>
                        <p className="text-gray-200 leading-relaxed text-lg">你就像一颗藤蔓植物——天生柔韧、适应力强，能随风借力向上生长。虽然看起来不如大树刚硬，但懂得绕开障碍，用巧劲达成目标。</p>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center mb-4">
                            <div
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-800 to-purple-800 mr-2">
                                <i className="fas fa-moon"></i>
                            </div>
                            <h3 className="text-xl font-semibold">「月令酉金」</h3>
                        </div>
                        <p className="text-gray-200 leading-relaxed text-lg">出生在秋季（农历八月），正值金属性能量最旺的季节。就像藤蔓遇到剪刀，你天生需要更多"水分和养料"（水木能量）来抵抗环境压力，否则容易缺乏安全感。</p>
                    </div>

                    <div>
                        <div className="flex items-center mb-6">
                            <div
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-800 to-purple-800 mr-2">
                                <i className="fas fa-key"></i>
                            </div>
                            <h3 className="text-xl font-semibold">「关键配置」</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div
                                className="bg-purple-800/30 p-6 rounded-xl shadow-lg shadow-purple-900/20 border border-purple-700/30 hover:translate-y-[-5px] transition-all duration-300">
                                <div className="flex items-center mb-3">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-800 to-purple-800 flex items-center justify-center mr-3">
                                        <i className="fas fa-tint"></i>
                                    </div>
                                    <h4 className="font-medium text-lg">癸水（智慧雨露）</h4>
                                </div>
                                <p className="text-gray-300 leading-relaxed">命带"天降甘露"，直觉敏锐，学习能力强，遇到难题常有贵人点拨。</p>
                            </div>
                            <div
                                className="bg-purple-800/30 p-6 rounded-xl shadow-lg shadow-purple-900/20 border border-purple-700/30 hover:translate-y-[-5px] transition-all duration-300">
                                <div className="flex items-center mb-3">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-800 to-purple-800 flex items-center justify-center mr-3">
                                        <i className="fas fa-fire"></i>
                                    </div>
                                    <h4 className="font-medium text-lg">丁火（外显光芒）</h4>
                                </div>
                                <p className="text-gray-300 leading-relaxed">外表热情开朗，擅长表达观点，但就像阳光下水分蒸发，过度输出会消耗内在能量。</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'personality' && (
                <div>
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <div
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 mr-2">
                                <i className="fas fa-star"></i>
                            </div>
                            <h3 className="text-xl font-semibold">优势特质</h3>
                        </div>
                        <div className="space-y-6">
                            <div
                                className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 p-6 rounded-xl border-l-4 border-emerald-500 shadow-lg">
                                <h4 className="font-medium text-lg mb-3 flex items-center">
                                    <i className="fas fa-crown text-yellow-500 mr-2"></i>
                                    谋略型领袖（ENTJ强化版）
                                </h4>
                                <p className="text-gray-200 leading-relaxed">你既有藤蔓的灵活思维，又有领袖的果决——擅长把碎片资源织成网，带领团队高效达成目标。比如工作中能快速发现合作方需求，促成多方共赢。</p>
                            </div>
                            {/* 其他优势特质 */}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mb-6">
                            <div
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 mr-2">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <h3 className="text-xl font-semibold">潜在挑战</h3>
                        </div>
                        <div className="space-y-6">
                            <div
                                className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 p-6 rounded-xl border-l-4 border-amber-500 shadow-lg">
                                <h4 className="font-medium text-lg mb-3 flex items-center">
                                    <i className="fas fa-battery-quarter text-red-400 mr-2"></i>
                                    能量内耗陷阱
                                </h4>
                                <p className="text-gray-200 leading-relaxed">藤蔓需要依附支架生长，若强行独自硬扛，会陷入"想太多-焦虑-行动力下降"的循环。比如深夜反复修改方案，反而降低效率。</p>
                            </div>
                            {/* 其他潜在挑战 */}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'trends' && (
                <div className="space-y-8">
                    <div
                        className="rounded-xl p-1 bg-gradient-to-r from-purple-800 to-indigo-800 shadow-lg shadow-purple-900/30">
                        <div className="bg-purple-900/90 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 mr-4">
                                    <i className="fas fa-briefcase text-xl"></i>
                                </div>
                                <div>
                                    <p className="text-purple-300 text-sm">事业运势</p>
                                    <h3 className="font-semibold text-xl">风筝借东风</h3>
                                </div>
                            </div>
                            <p className="text-gray-200 leading-relaxed">今年木火能量旺盛，适合推动创新项目，但警惕"火大烧干"——团队合作比单打独斗更利成功。3月易有重要合作机会，需快速抓住。</p>
                            <div className="mt-4 flex">
                                <span className="px-3 py-1 bg-blue-900/40 text-blue-400 text-xs rounded-full mr-2">
                                    <i className="fas fa-arrow-trend-up mr-1"></i> 创新项目
                                </span>
                                <span className="px-3 py-1 bg-blue-900/40 text-blue-400 text-xs rounded-full">
                                    <i className="fas fa-users mr-1"></i> 团队协作
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* 其他趋势卡片 */}
                </div>
            )}
        </>
    );
};

export default ReportPage;