import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HeroCard } from "@/components/HeroCard";
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Users,
  ExternalLink,
  Heart,
  ThumbsUp,
  Clock,
  Flame,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DApp {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  votes: number;
  users: string;
  image: string;
  featured: boolean;
  tvl?: string;
}

interface VoteItem {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  totalVotes: number;
  reward: number;
  timeLeft: string;
  category: string;
}

const mockDApps: DApp[] = [
  {
    id: "1",
    name: "UniswapV3",
    description: "Leading decentralized exchange protocol",
    category: "DeFi",
    rating: 4.8,
    votes: 1520,
    users: "2.1M",
    image: "/placeholder.svg",
    featured: true,
    tvl: "$4.2B"
  },
  {
    id: "2", 
    name: "SushiSwap",
    description: "Community-driven DeFi platform",
    category: "DeFi", 
    rating: 4.6,
    votes: 890,
    users: "850K",
    image: "/placeholder.svg",
    featured: true,
    tvl: "$1.8B"
  },
  {
    id: "3",
    name: "Aave Protocol",
    description: "Decentralized lending and borrowing",
    category: "DeFi",
    rating: 4.7,
    votes: 1205,
    users: "1.3M", 
    image: "/placeholder.svg",
    featured: false,
    tvl: "$6.1B"
  },
  {
    id: "4",
    name: "OpenSea",
    description: "World's first and largest NFT marketplace",
    category: "NFT",
    rating: 4.3,
    votes: 2300,
    users: "3.5M",
    image: "/placeholder.svg", 
    featured: false
  },
  {
    id: "5",
    name: "Compound",
    description: "Autonomous interest rate protocol",
    category: "DeFi",
    rating: 4.5,
    votes: 980,
    users: "1.8M",
    image: "/placeholder.svg",
    featured: false,
    tvl: "$3.1B"
  },
  {
    id: "6",
    name: "MakerDAO",
    description: "Decentralized autonomous organization",
    category: "DeFi",
    rating: 4.6,
    votes: 1350,
    users: "900K",
    image: "/placeholder.svg",
    featured: false,
    tvl: "$5.8B"
  }
];

const mockHotDApps: DApp[] = [
  ...mockDApps.slice(0, 6).map(app => ({ ...app, featured: false }))
];

const mockLatestDApps: DApp[] = [
  ...mockDApps.slice(2).map(app => ({ ...app, featured: false }))
];

const mockVoteItems: VoteItem[] = [
  {
    id: "1",
    title: "List Compound Protocol",
    description: "Should we add Compound to the discovery platform?",
    upvotes: 450,
    totalVotes: 473,
    reward: 50,
    timeLeft: "2d 14h",
    category: "DeFi"
  },
  {
    id: "2",
    title: "Rate SushiSwap Update", 
    description: "How do you rate the latest SushiSwap v3 features?",
    upvotes: 890,
    totalVotes: 1000,
    reward: 40,
    timeLeft: "1d 5h",
    category: "DeFi"
  }
];

const categories = ["All", "DeFi", "NFT", "Gaming", "Infrastructure", "Social"];

export default function Discover() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [allDApps, setAllDApps] = useState<DApp[]>(mockDApps.slice(0, 3));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filteredAllDApps = allDApps.filter(dapp => {
    const matchesSearch = dapp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dapp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const loadMoreDApps = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const currentLength = allDApps.length;
      const nextDApps = mockDApps.slice(currentLength, currentLength + 3);
      
      if (nextDApps.length > 0) {
        setAllDApps(prev => [...prev, ...nextDApps]);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  }, [allDApps.length, isLoading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
        return;
      }
      loadMoreDApps();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreDApps, isLoading]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Card */}
      <HeroCard />

      <div className="p-4 md:px-6 lg:px-8 space-y-6">
        {/* Desktop: Grid layout for sections */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Featured dApps */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <h2 className="text-mobile-base md:text-base font-semibold text-foreground">{t('featuredDApps')}</h2>
              </div>
              
              {/* Mobile: Carousel, Desktop: Grid */}
              <div className="block md:hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {mockDApps.filter(dapp => dapp.featured).map((dapp) => (
                      <CarouselItem key={dapp.id}>
                        <Card className="p-4 bg-gradient-card border-border/50 interactive-scale">
                          <div className="flex space-x-3">
                            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                              <img src={dapp.image} alt={dapp.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-mobile-sm font-semibold text-foreground">
                                    {dapp.name}
                                  </h3>
                                  <p className="text-mobile-xs text-muted-foreground">
                                    {dapp.description}
                                  </p>
                                </div>
                                <Button size="sm" variant="ghost" className="p-1">
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-accent fill-current" />
                                  <span className="text-mobile-xs text-foreground">{dapp.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-mobile-xs text-muted-foreground">{dapp.users}</span>
                                </div>
                                {dapp.tvl && (
                                  <Badge variant="secondary" className="text-mobile-xs">
                                    TVL {dapp.tvl}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Button size="sm" className="flex-1 text-mobile-xs h-7">
                                  {t('voteEarnCP')}
                                </Button>
                                <Button size="sm" variant="outline" className="p-1">
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              
              {/* Desktop: Grid */
}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-1 gap-4">
                {mockDApps.filter(dapp => dapp.featured).map((dapp) => (
                  <Card key={dapp.id} className="p-4 bg-gradient-card border-border/50 interactive-scale">
                    <div className="flex space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                        <img src={dapp.image} alt={dapp.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-mobile-sm font-semibold text-foreground">
                              {dapp.name}
                            </h3>
                            <p className="text-mobile-xs text-muted-foreground">
                              {dapp.description}
                            </p>
                          </div>
                          <Button size="sm" variant="ghost" className="p-1">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-accent fill-current" />
                            <span className="text-mobile-xs text-foreground">{dapp.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-mobile-xs text-muted-foreground">{dapp.users}</span>
                          </div>
                          {dapp.tvl && (
                            <Badge variant="secondary" className="text-mobile-xs">
                              TVL {dapp.tvl}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button size="sm" className="flex-1 text-mobile-xs h-7">
                            {t('voteEarnCP')}
                          </Button>
                          <Button size="sm" variant="outline" className="p-1">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* All dApps with Search */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-mobile-base md:text-base font-semibold text-foreground">{t('allDApps')}</h2>
                <div className="relative w-48 md:w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    placeholder={t('search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 text-mobile-xs md:text-sm h-8 md:h-9"
                  />
                </div>
              </div>
              
              <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-1 md:gap-4 md:space-y-0">
                {filteredAllDApps.map((dapp, index) => (
                  <div key={dapp.id}>
                    <div className="flex items-center space-x-3 py-2 md:p-3 md:bg-gradient-card md:rounded-lg md:border md:border-border/50">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg overflow-hidden">
                        <img src={dapp.image} alt={dapp.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-mobile-sm md:text-sm font-medium text-foreground truncate">
                            {dapp.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-accent fill-current" />
                            <span className="text-mobile-xs md:text-sm text-foreground">{dapp.rating}</span>
                          </div>
                        </div>
                        <p className="text-mobile-xs md:text-sm text-muted-foreground truncate">
                          {dapp.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-mobile-xs md:text-xs">
                            {dapp.category}
                          </Badge>
                          <span className="text-mobile-xs md:text-xs text-muted-foreground">
                            {dapp.votes} votes
                          </span>
                        </div>
                      </div>
                    </div>
                    {index < filteredAllDApps.length - 1 && (
                      <Separator className="my-2 md:hidden" />
                    )}
                  </div>
                ))}
              </div>
              
              {isLoading && (
                <div className="text-center py-4">
                  <p className="text-mobile-sm text-muted-foreground">Loading more dApps...</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            {/* Hot dApps */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <h2 className="text-base font-semibold text-foreground">{t('hotDApps')}</h2>
              </div>
              <div className="space-y-3">
                {mockHotDApps.slice(0, 4).map((dapp, index) => (
                  <div key={dapp.id}>
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden">
                        <img src={dapp.image} alt={dapp.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-foreground truncate">
                            {dapp.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-accent fill-current" />
                            <span className="text-xs text-foreground">{dapp.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {dapp.description}
                        </p>
                      </div>
                    </div>
                    {index < 3 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Show remaining sections */}
        <div className="block lg:hidden space-y-6">
          {/* Hot dApps - Mobile Carousel */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <h2 className="text-mobile-base font-semibold text-foreground">{t('hotDApps')}</h2>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {Array.from({ length: Math.ceil(mockHotDApps.length / 3) }, (_, i) => (
                  <CarouselItem key={i}>
                    <div className="space-y-3">
                      {mockHotDApps.slice(i * 3, (i + 1) * 3).map((dapp, index) => (
                        <div key={dapp.id}>
                          <div className="flex items-center space-x-3 py-2">
                            <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden">
                              <img src={dapp.image} alt={dapp.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="text-mobile-sm font-medium text-foreground truncate">
                                  {dapp.name}
                                </h3>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-accent fill-current" />
                                  <span className="text-mobile-xs text-foreground">{dapp.rating}</span>
                                </div>
                              </div>
                              <p className="text-mobile-xs text-muted-foreground truncate">
                                {dapp.description}
                              </p>
                            </div>
                          </div>
                          {index < 2 && mockHotDApps.slice(i * 3, (i + 1) * 3).length > index + 1 && (
                            <Separator className="my-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
