import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Moon, Sun, Menu, X, ChevronRight, Heart, Briefcase, DollarSign, Users } from 'lucide-react';

// 定义组件的 props 类型
interface WelcomeProps {
    onStartAnalysis?: () => void;  // 点击"开始分析"按钮时的回调函数，设为可选
}

// 重新设计的五行宝石命盘背景组件
const WuxingChartBackground = () => {
    // 定义五行对应的宝石/水晶
    const wuxingGems = [
        {
            name: "木",
            symbol: "木",
            mainColor: "#10b981",
            darkShade: "#059669",
            lightShade: "#34d399",
            highlight: "#a7f3d0",
            shadow: "#065f46",
            glowColor: "rgba(16, 185, 129, 0.6)"
        },
        {
            name: "火",
            symbol: "火",
            mainColor: "#ef4444",
            darkShade: "#b91c1c",
            lightShade: "#f87171",
            highlight: "#fecaca",
            shadow: "#7f1d1d",
            glowColor: "rgba(239, 68, 68, 0.6)"
        },
        {
            name: "土",
            symbol: "土",
            mainColor: "#d97706",
            darkShade: "#92400e",
            lightShade: "#fbbf24",
            highlight: "#fde68a",
            shadow: "#78350f",
            glowColor: "rgba(217, 119, 6, 0.6)"
        },
        {
            name: "金",
            symbol: "金",
            mainColor: "#fcd34d",
            darkShade: "#d97706",
            lightShade: "#fde68a",
            highlight: "#fef3c7",
            shadow: "#92400e",
            glowColor: "rgba(252, 211, 77, 0.6)"
        },
        {
            name: "水",
            symbol: "水",
            mainColor: "#3b82f6",
            darkShade: "#1d4ed8",
            lightShade: "#60a5fa",
            highlight: "#bfdbfe",
            shadow: "#1e40af",
            glowColor: "rgba(59, 130, 246, 0.6)"
        }
    ];

    // 天干地支
    const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 主命盘 - 右上角倾斜放置 */}
            <div className="absolute -top-[15%] -right-[15%] w-[130%] h-[130%] transform rotate-12 opacity-30 scale-90">
                {/* 主命盘区域 */}
                <div className="absolute top-[15%] left-[15%] w-[70%] h-[70%]">
                    <div className="w-full h-full relative">
                        {/* 外环光晕效果 */}
                        <div className="absolute inset-[-1%] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse blur-md" style={{animationDuration: '8s'}}></div>

                        {/* 中层天干 */}
                        <div className="absolute inset-[10%] rounded-full border border-white/10 animate-spin" style={{animationDuration: '90s', animationDirection: 'reverse'}}>
                            {heavenlyStems.map((stem, i) => {
                                const angle = (i * 36) * (Math.PI / 180);
                                const x = 50 + 45 * Math.cos(angle);
                                const y = 50 + 45 * Math.sin(angle);
                                return (
                                    <div
                                        key={`stem-bg-${i}`}
                                        className="absolute w-8 h-8 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white/10"
                                        style={{ left: `${x}%`, top: `${y}%` }}
                                    >
                                        <span className="text-white/70 text-lg font-semibold">{stem}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 五行宝石/水晶环 */}
                        <div className="absolute inset-[25%] rounded-full animate-spin" style={{animationDuration: '60s'}}>
                            {wuxingGems.map((gem, index) => {
                                const angle = (index * 72) * (Math.PI / 180);
                                const x = 50 + 38 * Math.cos(angle - Math.PI/2);
                                const y = 50 + 38 * Math.sin(angle - Math.PI/2);
                                return (
                                    <div
                                        key={`gem-bg-${index}`}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            left: `${x}%`,
                                            top: `${y}%`,
                                            width: '80px',
                                            height: '80px',
                                            filter: `drop-shadow(0 0 10px ${gem.glowColor})`
                                        }}
                                    >
                                        {/* 宝石容器 */}
                                        <div className="relative w-full h-full">
                                            {/* 宝石外部光晕 */}
                                            <div
                                                className="absolute inset-0 animate-pulse rounded-full"
                                                style={{
                                                    background: `radial-gradient(circle, ${gem.glowColor} 0%, transparent 70%)`,
                                                    animationDuration: `${3 + index * 0.5}s`,
                                                    transform: 'scale(1.2)'
                                                }}
                                            ></div>

                                            {/* 宝石本体 - 使用伪3D效果 */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {/* 宝石底部阴影 */}
                                                <div
                                                    className="absolute rounded-full"
                                                    style={{
                                                        width: '70%',
                                                        height: '15%',
                                                        bottom: '-5%',
                                                        background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
                                                        filter: 'blur(2px)',
                                                        transform: 'rotateX(60deg)'
                                                    }}
                                                ></div>

                                                {/* 宝石主体 */}
                                                <div
                                                    className="relative w-[95%] h-[95%] rounded-full overflow-hidden flex items-center justify-center"
                                                    style={{
                                                        background: `radial-gradient(circle at 30% 30%, ${gem.highlight} 0%, ${gem.lightShade} 20%, ${gem.mainColor} 50%, ${gem.darkShade} 80%, ${gem.shadow} 100%)`,
                                                        boxShadow: `  
                              inset 0 0 15px rgba(255,255,255,0.7),  
                              inset 5px -5px 15px rgba(0,0,0,0.3),  
                              0 0 5px ${gem.glowColor}  
                            `
                                                    }}
                                                >
                                                    {/* 宝石顶部高光 */}
                                                    <div
                                                        className="absolute"
                                                        style={{
                                                            width: '60%',
                                                            height: '30%',
                                                            top: '15%',
                                                            left: '15%',
                                                            background: `linear-gradient(135deg, ${gem.highlight}99 0%, ${gem.highlight}33 40%, transparent 70%)`,
                                                            borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
                                                            transform: 'rotate(-15deg)'
                                                        }}
                                                    ></div>

                                                    {/* 宝石次要高光 */}
                                                    <div
                                                        className="absolute"
                                                        style={{
                                                            width: '20%',
                                                            height: '15%',
                                                            bottom: '25%',
                                                            right: '25%',
                                                            background: `linear-gradient(135deg, ${gem.highlight}77 0%, transparent 100%)`,
                                                            borderRadius: '50%',
                                                            filter: 'blur(1px)'
                                                        }}
                                                    ></div>

                                                    {/* 宝石内部闪光效果 */}
                                                    <div
                                                        className="absolute w-full h-full opacity-30"
                                                        style={{
                                                            background: `  
                                radial-gradient(circle at 70% 20%, white 0%, transparent 8%),  
                                radial-gradient(circle at 30% 65%, white 0%, transparent 6%),  
                                radial-gradient(circle at 60% 80%, white 0%, transparent 5%)  
                              `
                                                        }}
                                                    ></div>

                                                    {/* 符号 */}
                                                    <div
                                                        className="relative z-10 text-white text-2xl font-bold drop-shadow-md"
                                                        style={{
                                                            textShadow: `0 0 5px rgba(0,0,0,0.5)`
                                                        }}
                                                    >
                                                        {gem.symbol}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 相生相克连线 */}
                        <svg className="absolute inset-[25%] w-[50%] h-[50%] opacity-40" viewBox="0 0 100 100">
                            {/* 相生循环 - 实线 */}
                            <path d="M50,8 L68,26 L58,58 L30,62 L20,30 Z"
                                  fill="none"
                                  stroke="url(#wuxing-bg-gradient)"
                                  strokeWidth="1"
                                  strokeDasharray="1,1"
                                  className="animate-pulse"
                                  style={{animationDuration: '15s'}}
                            />

                            {/* 相克线 - 虚线 */}
                            <path d="M50,8 L30,62 M68,26 L20,30 M58,58 L50,8"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.4)"
                                  strokeWidth="0.7"
                                  strokeDasharray="1,1"
                            />

                            {/* 渐变定义 */}
                            <defs>
                                <linearGradient id="wuxing-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                                    <stop offset="25%" stopColor="#ef4444" stopOpacity="0.8" />
                                    <stop offset="50%" stopColor="#d97706" stopOpacity="0.8" />
                                    <stop offset="75%" stopColor="#fcd34d" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* 装饰光效 */}
                        {wuxingGems.map((gem, index) => {
                            const angle = (index * 72) * (Math.PI / 180);
                            return (
                                <div
                                    key={`glow-bg-${index}`}
                                    className="absolute top-1/2 left-1/2 h-1 origin-left blur-md"
                                    style={{
                                        width: '40%',
                                        transform: `rotate(${index * 72}deg)`,
                                        opacity: 0.4,
                                        background: gem.mainColor
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 左下小型命盘 */}
            <div className="absolute -bottom-[5%] -left-[5%] w-[30%] h-[30%] opacity-20 scale-110">
                <div className="w-full h-full relative">
                    <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-spin" style={{animationDuration: '90s', animationDirection: 'reverse'}}>
                        {wuxingGems.map((gem, index) => {
                            const angle = (index * 72) * (Math.PI / 180);
                            const x = 50 + 46 * Math.cos(angle - Math.PI/2);
                            const y = 50 + 46 * Math.sin(angle - Math.PI/2);
                            return (
                                <div
                                    key={`gem-small-${index}`}
                                    className="absolute w-7 h-7 rounded-full transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                                    style={{
                                        left: `${x}%`,
                                        top: `${y}%`,
                                        background: `radial-gradient(circle at 30% 30%, ${gem.highlight} 0%, ${gem.lightShade} 30%, ${gem.mainColor} 60%, ${gem.darkShade} 100%)`,
                                        boxShadow: `inset 0 0 5px rgba(255,255,255,0.7), 0 0 5px ${gem.glowColor}`
                                    }}
                                >
                                    {/* 小宝石高光 */}
                                    <div
                                        className="absolute"
                                        style={{
                                            width: '60%',
                                            height: '40%',
                                            top: '10%',
                                            left: '10%',
                                            background: `linear-gradient(135deg, ${gem.highlight}99 0%, transparent 100%)`,
                                            borderRadius: '50% / 70% 70% 30% 30%'
                                        }}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="absolute inset-[30%] rounded-full bg-white/10 animate-pulse" style={{animationDuration: '4s'}}></div>
                </div>
            </div>
        </div>
    );
};

const Navbar = ({ onStartAnalysis }) => {
    const navigate = useNavigate(); // 使用React Router的钩子
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 处理点击"开始分析"按钮
    const handleStartAnalysis = () => {
        if (onStartAnalysis) {
            onStartAnalysis();
        } else {
            navigate('/form');
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Star className="text-purple-400" size={24} />
                    <span className="text-xl font-bold">命运之光</span>
                </div>

                {/* 桌面导航 */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="hover:text-purple-400 transition-colors">服务特色</a>
                    <a href="#how-it-works" className="hover:text-purple-400 transition-colors">解析流程</a>
                    <a href="#testimonials" className="hover:text-purple-400 transition-colors">用户评价</a>
                    <a href="#pricing" className="hover:text-purple-400 transition-colors">服务套餐</a>
                    <button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-full shadow-md transform transition duration-300 hover:scale-105"
                        onClick={handleStartAnalysis}
                    >
                        开始分析
                    </button>
                </div>

                {/* 移动端菜单按钮 */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 移动端菜单 */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 w-full py-4 shadow-lg">
                    <div className="container mx-auto px-4 flex flex-col space-y-4">
                        <a href="#features" className="hover:text-purple-400 transition-colors py-2 border-b border-white/10">服务特色</a>
                        <a href="#how-it-works" className="hover:text-purple-400 transition-colors py-2 border-b border-white/10">解析流程</a>
                        <a href="#testimonials" className="hover:text-purple-400 transition-colors py-2 border-b border-white/10">用户评价</a>
                        <a href="#pricing" className="hover:text-purple-400 transition-colors py-2 border-b border-white/10">服务套餐</a>
                        <button
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-full shadow-md transform transition duration-300 hover:scale-105 w-full"
                            onClick={handleStartAnalysis}
                        >
                            开始我的命盘分析
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const HeroSection = ({ onStartAnalysis }) => {
    const navigate = useNavigate();

    const handleStartAnalysis = () => {
        if (onStartAnalysis) {
            onStartAnalysis();
        } else {
            navigate('/form');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center pt-20">
            {/* 背景装饰 */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-600/20 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-pink-600/20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            <span className="block">探索</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">命运密码</span>
                            <span className="block">遇见真实的自己</span>
                        </h1>
                        <p className="text-xl text-purple-200 mb-8">AI玄学命盘分析，揭示你的天赋潜能与人生方向</p>
                        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 flex items-center justify-center"
                                onClick={handleStartAnalysis}
                            >
                                开始我的命盘分析
                                <ChevronRight size={20} className="ml-2" />
                            </button>
                            <a
                                href="#how-it-works"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
                            >
                                了解更多
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturesSection = () => {
    const features = [
        {
            icon: <div className="text-2xl mb-2">✨</div>,
            title: "人格解析",
            description: "独特气质与天赋揭示，帮助你了解自己的核心特质和潜在能力。",
            color: "from-purple-400 to-purple-600"
        },
        {
            icon: <div className="text-2xl mb-2">🔮</div>,
            title: "运势预测",
            description: "基于东方命理学和现代心理学的事业、情感与财运分析。",
            color: "from-pink-400 to-pink-600"
        },
        {
            icon: <div className="text-2xl mb-2">💫</div>,
            title: "成长指引",
            description: "潜能激发与平衡建议，帮助你克服障碍，发挥最大潜力。",
            color: "from-blue-400 to-blue-600"
        },
        {
            icon: <div className="text-2xl mb-2">🌙</div>,
            title: "关系分析",
            description: "探索你与他人的缘分与相处模式，提升人际关系质量。",
            color: "from-indigo-400 to-indigo-600"
        },
        {
            icon: <div className="text-2xl mb-2">⚡</div>,
            title: "时机把握",
            description: "了解人生关键时刻，掌握行动与等待的最佳时机。",
            color: "from-amber-400 to-amber-600"
        },
        {
            icon: <div className="text-2xl mb-2">🌟</div>,
            title: "灵性觉醒",
            description: "探索内在智慧，连接高我意识，启发心灵成长。",
            color: "from-teal-400 to-teal-600"
        }
    ];

    return (
        <section id="features" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/10 to-black/0 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">服务特色</h2>
                    <p className="text-xl text-purple-200 max-w-2xl mx-auto">命运之光将为您提供全方位的命盘解析，帮助您更好地认识自己，规划未来</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 group"
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-purple-200">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection = () => {
    const steps = [
        {
            number: 1,
            title: "填写基本信息",
            description: "提供您的出生年月日时和出生地点，用于精确计算您的命盘。",
            icon: <Users size={24} className="text-white" />
        },
        {
            number: 2,
            title: "AI深度解析",
            description: "我们的人工智能系统结合传统命理和现代心理学对您的命盘进行分析。",
            icon: <Moon size={24} className="text-white" />
        },
        {
            number: 3,
            title: "生成个性报告",
            description: "系统生成您的专属命盘解析报告，包含性格特质、潜能和发展建议。",
            icon: <Star size={24} className="text-white" />
        },
        {
            number: 4,
            title: "专业顾问解读",
            description: "可选择与我们的命理顾问进行一对一解读，获得更深入的指导。",
            icon: <Sun size={24} className="text-white" />
        }
    ];

    return (
        <section id="how-it-works" className="py-20 relative bg-black/40">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">解析流程</h2>
                    <p className="text-xl text-purple-200 max-w-2xl mx-auto">四个简单步骤，开启您的命运探索之旅</p>
                </div>

                <div className="relative">
                    {/* 连接线 */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 transform -translate-x-1/2 z-0"></div>

                    <div className="space-y-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                        <p className="text-purple-200">{step.description}</p>
                                    </div>
                                </div>

                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center z-20 shadow-lg">
                                    {step.icon}
                                </div>

                                <div className="flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    // 在TestimonialsSection组件中修改这部分
    const testimonials = [
        {
            name: "李明",
            // 使用开源的占位图像服务或本地静态文件
            avatar: "https://i.pravatar.cc/80?img=1", // 使用Pravatar服务提供随机头像
            text: "命运之光的分析非常准确，特别是对我性格的描述让我惊讶不已。通过了解自己的天赋所在，我在职业选择上更加有信心了。",
            rating: 5,
            type: <Heart size={16} className="text-pink-500" />
        },
        {
            name: "张华",
            avatar: "https://i.pravatar.cc/80?img=2",
            text: "我一直对自己的人生方向感到迷茫，命运之光的分析帮助我理清了思路，找到了适合自己的道路。推荐给所有正在寻找方向的人！",
            rating: 5,
            type: <Briefcase size={16} className="text-blue-500" />
        },
        {
            name: "王芳",
            avatar: "https://i.pravatar.cc/80?img=3",
            text: "分析报告中对我与伴侣关系的解读非常到位，帮助我们更好地理解彼此，改善了我们的沟通方式。感谢命运之光！",
            rating: 4,
            type: <Heart size={16} className="text-pink-500" />
        },
        {
            name: "赵伟",
            avatar: "https://i.pravatar.cc/80?img=4",
            text: "作为一名创业者，命运之光的财运分析给了我很多启示，让我在投资决策上更加明智。服务非常值得。",
            rating: 5,
            type: <DollarSign size={16} className="text-green-500" />
        }
    ];

    return (
        <section id="testimonials" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/10 to-black/0 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">用户评价</h2>
                    <p className="text-xl text-purple-200 max-w-2xl mx-auto">听听他们的故事，看看命运之光如何改变他们的生活</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 flex-shrink-0">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center mb-2">
                                        <h4 className="font-semibold mr-2">{testimonial.name}</h4>
                                        <div className="bg-white/10 rounded-full px-2 py-0.5 text-xs flex items-center">
                                            {testimonial.type}
                                            <span className="ml-1">分析用户</span>
                                        </div>
                                    </div>
                                    <div className="flex mb-3">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                        {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                                            <Star key={i} size={16} className="text-gray-400" />
                                        ))}
                                    </div>
                                    <p className="text-purple-200">{testimonial.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PricingSection = ({ onStartAnalysis }) => {
    const navigate = useNavigate();

    const handleStartAnalysis = () => {
        if (onStartAnalysis) {
            onStartAnalysis();
        } else {
            navigate('/form');
        }
    };

    const plans = [
        {
            name: "基础分析",
            price: "88",
            description: "个人命盘基础解析",
            features: [
                "人格特质分析",
                "核心天赋识别",
                "基础运势预测",
                "PDF格式报告",
                "7天内修改一次"
            ],
            highlighted: false
        },
        {
            name: "深度解析",
            price: "188",
            description: "全方位深度命盘分析",
            features: [
                "详细人格分析",
                "全面天赋潜能揭示",
                "事业财运爱情预测",
                "个人成长路径规划",
                "PDF互动式报告",
                "30天内修改三次",
                "15分钟在线咨询"
            ],
            highlighted: true
        },
        {
            name: "专业顾问",
            price: "388",
            description: "专业顾问一对一解读",
            features: [
                "包含深度解析全部内容",
                "45分钟专业顾问解读",
                "个性化发展建议",
                "六个月运势规划",
                "关系匹配分析",
                "终身报告存档",
                "一年内免费更新一次"
            ],
            highlighted: false
        }
    ];

    return (
        <section id="pricing" className="py-20 relative bg-black/40">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">服务套餐</h2>
                    <p className="text-xl text-purple-200 max-w-2xl mx-auto">选择最适合您需求的命盘解析服务</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                                plan.highlighted
                                    ? 'bg-gradient-to-b from-purple-900/40 to-pink-900/40 border-2 border-purple-500 transform hover:-translate-y-2'
                                    : 'bg-white/5 border border-white/10 hover:border-white/20 hover:-translate-y-1'
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-1 text-sm font-medium">
                                    最受欢迎
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-purple-200 mb-6">{plan.description}</p>
                                <div className="mb-6">
                                    <span className="text-3xl font-bold">¥{plan.price}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <div className={`mr-2 mt-1 ${plan.highlighted ? 'text-purple-400' : 'text-purple-300'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                            <span className="text-purple-100">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 px-6 rounded-full font-semibold transition duration-300 ${
                                        plan.highlighted
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                                            : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
                                    onClick={handleStartAnalysis}
                                >
                                    选择此套餐
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CTASection = ({ onStartAnalysis }) => {
    const navigate = useNavigate();

    const handleStartAnalysis = () => {
        if (onStartAnalysis) {
            onStartAnalysis();
        } else {
            navigate('/form');
        }
    };

    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">开启你的命运探索之旅</h2>
                    <p className="text-xl text-purple-200 mb-8">每个人都有独特的命运密码，探索你的天赋潜能，找到真实的自己</p>
                    <button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg transform transition duration-300 hover:scale-105 text-lg"
                        onClick={handleStartAnalysis}
                    >
                        立即开始我的命盘分析
                    </button>
                    <p className="mt-6 text-purple-300">已有超过10,000人通过命运之光发现自己的潜能</p>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-black/60 backdrop-blur-sm py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Star className="text-purple-400" size={24} />
                            <span className="text-xl font-bold">命运之光</span>
                        </div>
                        <p className="text-purple-200">探索命理，遇见真我</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">服务项目</h4>
                        <ul className="space-y-2 text-purple-200">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">命盘分析</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">关系匹配</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">事业规划</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">个人成长</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">关于我们</h4>
                        <ul className="space-y-2 text-purple-200">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">团队介绍</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">技术原理</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">用户案例</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">联系我们</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">关注我们</h4>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                            </a>
                        </div>
                        <p className="text-purple-200">订阅我们的更新</p>
                        <div className="mt-2 flex">
                            <input
                                type="email"
                                placeholder="您的邮箱"
                                className="bg-white/10 border border-white/20 rounded-l-full px-4 py-2 text-white focus:outline-none focus:border-purple-500 placeholder-white/50 flex-1"
                            />
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-full px-4">
                                订阅
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-purple-300 text-sm mb-4 md:mb-0">命运之光 © 2025 - 探索命理，遇见真我</p>
                    <div className="flex space-x-6 text-sm text-purple-300">
                        <a href="#" className="hover:text-purple-400 transition-colors">隐私政策</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">服务条款</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">常见问题</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Welcome: React.FC<WelcomeProps> = ({ onStartAnalysis }) => {
    const navigate = useNavigate();

    // 创建一个处理导航的函数
    const handleStartAnalysis = () => {
        if (onStartAnalysis) {
            onStartAnalysis(); // 如果传入了回调函数，则使用回调
        } else {
            navigate('/form'); // 否则使用React Router导航
        }
    };

    useEffect(() => {
        // 添加页面平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* 原有背景 */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-black"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,50,200,0.15),rgba(0,0,0,0))]"></div>
                {/* 星星效果 */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 3 + 1}px`,
                                height: `${Math.random() * 3 + 1}px`,
                                opacity: Math.random() * 0.7 + 0.3,
                                animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* 五行宝石命盘背景 */}
            <WuxingChartBackground />

            <style jsx>{`
                @keyframes twinkle {
                    0% { opacity: 0.3; }
                    100% { opacity: 1; }
                }
            `}</style>

            <Navbar onStartAnalysis={handleStartAnalysis} />
            <HeroSection onStartAnalysis={handleStartAnalysis} />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <PricingSection onStartAnalysis={handleStartAnalysis} />
            <CTASection onStartAnalysis={handleStartAnalysis} />
            <Footer />
        </div>
    );
};

export default Welcome;