import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserData} from '../contexts/UserDataContext';
import {
    Calendar, Clock, MapPin, User, Users,
    Star, ArrowRight, CheckCircle
} from "lucide-react";

const API_BASE_URL = "http://localhost:8000";

interface FormData {
    name: string;
    gender: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    anonymous: boolean;
}

interface UserInfoCollectorProps {
    onBack?: () => void;
    onComplete?: (formData: FormData) => void;
}

const UserInfoCollector: React.FC<UserInfoCollectorProps> = ({onBack, onComplete}) => {
    const navigate = useNavigate();
    const {userData, setUserData, clearUserData} = useUserData();

    // 修改初始化逻辑
    useEffect(() => {
        // 清除之前的临时表单数据
        sessionStorage.removeItem('tempFormData');
        sessionStorage.removeItem('formStep');

        // 仅在没有用户数据时才清空
        if (!userData.name) {
            clearUserData();
        }
    }, [clearUserData, userData]);

    const [step, setStep] = useState(() => {
        const savedStep = sessionStorage.getItem('formStep');
        return savedStep ? parseInt(savedStep, 10) : 1;
    });

    const [formData, setFormData] = useState<FormData>(() => {
        const savedData = sessionStorage.getItem('tempFormData');

        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error("解析缓存表单数据失败", e);
            }
        }

        return {
            name: userData.name || "",
            gender: userData.gender || "",
            birthDate: userData.birthDate || "",
            birthTime: userData.birthTime || "",
            birthPlace: userData.birthPlace || "",
            anonymous: userData.anonymous || false
        };
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        sessionStorage.setItem('tempFormData', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        sessionStorage.setItem('formStep', step.toString());
    }, [step]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        // 处理复选框
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            // 处理普通输入
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const nextStep = () => {
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate('/');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/user-info`, formData);

            // 更新 Context 中的用户数据，但不清空
            setUserData(prevData => ({
                ...prevData,
                ...formData  // 只更新变动的字段
            }));

            // 只存储实际的报告数据
            localStorage.setItem('userReport', JSON.stringify(response.data.data));

            if (onComplete) {
                onComplete(formData);
            } else {
                setStep(5);
            }
        } catch (error) {
            console.error("提交失败:", error);
            setErrorMessage(
                axios.isAxiosError(error)
                    ? error.response?.data?.message || "网络错误"
                    : "未知错误"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewReport = () => {
        if (onComplete) {
            onComplete(formData);
        } else {
            navigate('/report');
        }
    };

    const validateCurrentStep = () => {
        switch (step) {
            case 1:
                return formData.name.trim().length >= 2 && formData.gender !== "";
            case 2:
                return formData.birthDate !== "" && formData.birthTime !== "";
            case 3:
                return formData.birthPlace.trim() !== "";
            default:
                return true;
        }
    };

    const isCurrentStepValid = validateCurrentStep();


    return (
        <div
            className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
            <div className="max-w-2xl w-full px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">命运之光</h1>
                    <p className="text-purple-200">个人命盘分析</p>
                </header>

                {/* 进度指示器 */}
                <div className="flex justify-between items-center mb-10 relative">
                    <div className="absolute h-1 bg-gray-700 top-1/2 left-0 right-0 -translate-y-1/2 z-0"></div>
                    <div
                        className="absolute h-1 bg-purple-500 top-1/2 left-0 right-0 -translate-y-1/2 z-0"
                        style={{width: `${(step - 1) * 25}%`}}
                    ></div>

                    {[1, 2, 3, 4].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center z-10   
                                ${step >= s ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}
                        >
                            {step > s ? <CheckCircle size={20}/> : s}
                        </div>
                    ))}
                </div>

                {errorMessage && (
                    <div className="bg-red-600/30 border border-red-500 text-red-200 p-4 rounded-lg mb-4 text-center">
                        {errorMessage}
                    </div>
                )}

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
                    {/* 第一步：姓名和性别 */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 text-center text-white">基本信息</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="flex items-center mb-2 text-white">
                                        <User size={18} className="mr-2"/>
                                        <span>姓名</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-white/10 border border-purple-300/30 focus:border-purple-300 focus:outline-none text-white"
                                        placeholder="输入您的姓名"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center mb-2 text-white">
                                        <Users size={18} className="mr-2"/>
                                        <span>性别</span>
                                    </label>
                                    <div className="flex space-x-4">
                                        {["男", "女"].map((gender) => (
                                            <label key={gender} className="flex items-center text-white">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={gender}
                                                    checked={formData.gender === gender}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                {gender}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="anonymous"
                                        checked={formData.anonymous}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label className="text-white">匿名分析</label>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition text-white"
                                    >
                                        返回主页
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!isCurrentStepValid}
                                        className={`flex items-center px-6 py-2 rounded-md transition ${
                                            isCurrentStepValid
                                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                                : "bg-purple-600/50 cursor-not-allowed text-white/50"
                                        }`}
                                    >
                                        下一步 <ArrowRight size={16} className="ml-2"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 第二步：出生日期和时间 */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 text-center text-white">出生信息</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="flex items-center mb-2 text-white">
                                        <Calendar size={18} className="mr-2"/>
                                        出生日期
                                    </label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-white/10 border border-purple-300/30 focus:border-purple-300 focus:outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center mb-2 text-white">
                                        <Clock size={18} className="mr-2"/>
                                        出生时间
                                    </label>
                                    <input
                                        type="time"
                                        name="birthTime"
                                        value={formData.birthTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-white/10 border border-purple-300/30 focus:border-purple-300 focus:outline-none text-white"
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition text-white"
                                    >
                                        上一步
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!isCurrentStepValid}
                                        className={`flex items-center px-6 py-2 rounded-md transition ${
                                            isCurrentStepValid
                                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                                : "bg-purple-600/50 cursor-not-allowed text-white/50"
                                        }`}
                                    >
                                        下一步 <ArrowRight size={16} className="ml-2"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 第三步：出生地 */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 text-center text-white">出生地信息</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="flex items-center mb-2 text-white">
                                        <MapPin size={18} className="mr-2"/>
                                        出生地
                                    </label>
                                    <input
                                        type="text"
                                        name="birthPlace"
                                        value={formData.birthPlace}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-white/10 border border-purple-300/30 focus:border-purple-300 focus:outline-none text-white"
                                        placeholder="省/市/区县"
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition text-white"
                                    >
                                        上一步
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={!isCurrentStepValid}
                                        className={`flex items-center px-6 py-2 rounded-md transition ${
                                            isCurrentStepValid
                                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                                : "bg-purple-600/50 cursor-not-allowed text-white/50"
                                        }`}
                                    >
                                        生成报告 <Star size={16} className="ml-2"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 加载状态 */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-6">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-300"></div>
                            </div>
                            <h2 className="text-xl font-semibold mb-3 text-white">正在解析您的命盘...</h2>
                            <p className="text-purple-200">AI正在分析您的先天能量场与人格特质</p>
                        </div>
                    )}

                    {/* 报告生成完成 */}
                    {step === 5 && (
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-6">
                                <div className="h-16 w-16 bg-purple-500 rounded-full flex items-center justify-center">
                                    <CheckCircle size={32} color="white"/>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mb-3 text-white">您的命盘分析已完成！</h2>
                            <p className="text-purple-200 mb-8">您的个人命运解析报告已准备就绪</p>
                            <button
                                onClick={handleViewReport}
                                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition shadow-lg text-white"
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