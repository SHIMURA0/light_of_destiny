import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import UserInfoCollector from './components/UserInfoCollector';
import ReportPage from './components/ReportPage';
import './App.css';

// 定义用户数据类型
interface UserData {
    name: string;
    gender: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    anonymous: boolean;
}

// 定义上下文类型
interface UserDataContextType {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

// 创建带有正确类型的上下文
export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

function App() {
    // 初始化用户数据，优先从localStorage读取
    const [userData, setUserData] = useState<UserData>(() => {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error("无法解析保存的用户数据", e);
            }
        }

        return {
            name: "",
            gender: "",
            birthDate: "",
            birthTime: "",
            birthPlace: "",
            anonymous: false
        };
    });

    // 当用户数据变化时，保存到localStorage
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    // 提供一个自定义钩子来获取Context，使其类型安全
    const userDataContextValue = React.useMemo(() => ({
        userData,
        setUserData
    }), [userData]);

    return (
        <UserDataContext.Provider value={userDataContextValue}>
            <BrowserRouter>
                <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 min-h-screen text-white w-full">
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/form" element={<UserInfoCollector />} />
                        <Route path="/report" element={<ReportPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserDataContext.Provider>
    );
}

// 创建自定义钩子，方便在组件中使用Context
export const useUserData = () => {
    const context = React.useContext(UserDataContext);
    if (context === undefined) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
};

export default App;