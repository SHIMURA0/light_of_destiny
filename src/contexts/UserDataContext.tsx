import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// 定义用户数据类型
export interface UserData {
    name: string;
    gender: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    anonymous: boolean;
}

// 定义上下文类型
export interface UserDataContextType {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    clearUserData: () => void;
}

// 定义初始的默认用户数据
const INITIAL_USER_DATA: UserData = {
    name: "",
    gender: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    anonymous: false
};

// 创建上下文
export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// 上下文提供者组件
export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 初始化用户数据，优先从localStorage读取
    const [userData, setUserData] = useState<UserData>(() => {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                // 确保数据完整性
                return {
                    ...INITIAL_USER_DATA,
                    ...parsedData
                };
            } catch (e) {
                console.error("无法解析保存的用户数据", e);
                return INITIAL_USER_DATA;
            }
        }
        return INITIAL_USER_DATA;
    });

    // 当用户数据变化时，保存到localStorage
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    // 清除用户数据的方法
    const clearUserData = () => {
        setUserData(INITIAL_USER_DATA);
        localStorage.removeItem('userData');
        localStorage.removeItem('userReport');
    };

    // 提供一个自定义钩子来获取Context，使其类型安全
    const contextValue = useMemo(() => ({
        userData,
        setUserData,
        clearUserData
    }), [userData]);

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    );
};

// 自定义钩子
export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (context === undefined) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
};