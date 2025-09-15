import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'EN' | 'CN' | 'FR' | 'ID';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    discover: "Discover",
    vote: "Vote",
    learn: "Learn", 
    rewards: "Rewards",
    more: "More",
    connect: "Connect",
    connected: "Connected",
    featuredDApps: "Featured dApps",
    hotDApps: "Hot dApps",
    latestDApps: "Latest dApps",
    voteDApps: "Vote dApps",
    allDApps: "All dApps",
    search: "Search...",
    voteNow: "Vote Now",
    voteEarnCP: "Vote & Earn CP",
    discoverDApps: "Discover dApps",
    exploreCitrea: "Explore the Citrea ecosystem and earn CP rewards",
    users: "Users",
    dApps: "dApps",
    active: "Active"
  },
  CN: {
    discover: "发现",
    vote: "投票",
    learn: "学习",
    rewards: "奖励",
    more: "更多",
    connect: "连接",
    connected: "已连接",
    featuredDApps: "精选 dApps",
    hotDApps: "热门 dApps", 
    latestDApps: "最新 dApps",
    voteDApps: "投票 dApps",
    allDApps: "所有 dApps",
    search: "搜索...",
    voteNow: "立即投票",
    voteEarnCP: "投票赚取 CP",
    discoverDApps: "发现 dApps",
    exploreCitrea: "探索 Citrea 生态系统并获得 CP 奖励",
    users: "用户",
    dApps: "dApps",
    active: "活跃"
  },
  FR: {
    discover: "Découvrir",
    vote: "Voter", 
    learn: "Apprendre",
    rewards: "Récompenses",
    more: "Plus",
    connect: "Connecter",
    connected: "Connecté",
    featuredDApps: "dApps en vedette",
    hotDApps: "dApps populaires",
    latestDApps: "Dernières dApps", 
    voteDApps: "Voter dApps",
    allDApps: "Toutes les dApps",
    search: "Rechercher...",
    voteNow: "Voter maintenant",
    voteEarnCP: "Voter et gagner des CP",
    discoverDApps: "Découvrir les dApps",
    exploreCitrea: "Explorez l'écosystème Citrea et gagnez des récompenses CP",
    users: "Utilisateurs",
    dApps: "dApps",
    active: "Actif"
  },
  ID: {
    discover: "Jelajahi",
    vote: "Voting",
    learn: "Belajar",
    rewards: "Hadiah", 
    more: "Lainnya",
    connect: "Hubungkan",
    connected: "Terhubung",
    featuredDApps: "dApps Unggulan",
    hotDApps: "dApps Populer",
    latestDApps: "dApps Terbaru",
    voteDApps: "Vote dApps", 
    allDApps: "Semua dApps",
    search: "Cari...",
    voteNow: "Vote Sekarang",
    voteEarnCP: "Vote & Dapatkan CP",
    discoverDApps: "Jelajahi dApps",
    exploreCitrea: "Jelajahi ekosistem Citrea dan dapatkan hadiah CP",
    users: "Pengguna",
    dApps: "dApps", 
    active: "Aktif"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('EN');

  // Save language preference to localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};