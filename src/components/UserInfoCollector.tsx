import React, { useState } from "react";
import { Calendar, Clock, MapPin, User, Users, Star, ArrowRight, CheckCircle } from "lucide-react";

// 扩展 props 接口添加表单完成回调  
interface UserInfoCollectorProps {
    onBack: () => void;
    onComplete: (formData: {
        name: string;
        gender: string;
        birthDate: string;
        birthTime: string;
        birthPlace: string;
        anonymous: boolean;
    }) => void;
}

const UserInfoCollector: React.FC<UserInfoCollectorProps> = ({ onBack, onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        birthDate: "",
        birthTime: "",
        birthPlace: "",
        anonymous: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 这里会处理表单提交，生成分析报告
        console.log("提交数据:", formData);
        setStep(4); // 进入加载状态

        // 模拟API请求延迟
        setTimeout(() => {
            setStep(5); // 显示报告已生成
        }, 3000);
    };

    // 处理查看报告按钮点击
    const handleViewReport = () => {
        onComplete(formData);
    };

    return (
        // 保持垂直和水平居中的样式
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="max-w-2xl w-full px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold">命运之光</h1>
                    <p className="text-purple-200">个人命盘分析</p>
                </header>

                {/* 进度指示器 */}
                <div className="flex justify-between items-center mb-10 relative">
                    <div className="absolute h-1 bg-gray-700 top-1/2 left-0 right-0 -translate-y-1/2 z-0"></div>
                    <div className="absolute h-1 bg-purple-500 top-1/2 left-0 right-0 -translate-y-1/2 z-0"
                         style={{ width: `${(step - 1) * 25}%` }}></div>

                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center z-10   
              ${step >= s ? 'bg-purple-500' : 'bg-gray-700'}`}>
                            {step > s ? <CheckCircle size={20} /> : s}
                        </div>
                    ))}
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 text-center">基本信息</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="flex items-center mb-2">
                                        <User size={18} className="mr-2" />
                                        <span>姓名</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-white/5 border border-purple-300/30 focus:border-purple-300 focus:outline-none"
                                        placeholder="输入您的姓名"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center mb-2">
                                        <Users size={18} className="mr-2" />
                                        <span>性别</span>
                                    </label>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="男"
                                                checked={formData.gender === "男"}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            <span>男</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="女"
                                                checked={formData.gender === "女"}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            <span>女</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center mt-4">
                                    <input
                                        type="checkbox"
                                        name="anonymous"
                                        checked={formData.anonymous}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label>匿名分析（不显示真实姓名）</label>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={onBack}
                                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition"
                                    >
                                        返回主页
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition"
                                    >
                                        下一步 <ArrowRight size={16} className="ml-2" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 text-center">出生信息</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="flex items-center mb-2">
                                        <Calendar size={18} className="mr-2" />
                                        <span>出生日期（阳历）</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-white/5 border border-purple-300/30 focus:border-purple-300 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center mb-2">
                                        <Clock size={18} className="mr-2" />
                                        <span>出生时间</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="birthTime"
                                        value={formData.birthTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-white/5 border border-purple-300/30 focus:border-purple-300 focus:outline-none"
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition"
                                    >
                                        上一步
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition"
                                    >
                                        下一步 <ArrowRight size={16} className="ml-2" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 text-center">出生地信息</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="flex items-center mb-2">
                                        <MapPin size={18} className="mr-2" />
                                        <span>出生地</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="birthPlace"
                                        value={formData.birthPlace}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-white/5 border border-purple-300/30 focus:border-purple-300 focus:outline-none"
                                        placeholder="省/市/区县"
                                    />
                                </div>

                                <div className="mt-6">
                                    <p className="text-sm text-purple-200 mb-4">
                                        您的所有信息将被保密处理，仅用于生成个人命盘分析报告。
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition"
                                    >
                                        上一步
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition"
                                    >
                                        生成报告 <Star size={16} className="ml-2" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-6">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-300"></div>
                            </div>
                            <h2 className="text-xl font-semibold mb-3">正在解析您的命盘...</h2>
                            <p className="text-purple-200">AI正在分析您的先天能量场与人格特质</p>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-6">
                                <div className="h-16 w-16 bg-purple-500 rounded-full flex items-center justify-center">
                                    <CheckCircle size={32} />
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mb-3">您的命盘分析已完成！</h2>
                            <p className="text-purple-200 mb-8">您的个人命运解析报告已准备就绪</p>
                            <button
                                onClick={handleViewReport}
                                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
                            >
                                查看我的命盘报告
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserInfoCollector;  