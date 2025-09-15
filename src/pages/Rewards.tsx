import { CPBalanceCard } from "@/components/rewards/CPBalanceCard";
import { NFTGallery } from "@/components/rewards/NFTGallery";
import { AchievementGrid } from "@/components/rewards/AchievementGrid";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Calendar, 
  TrendingUp, 
  Target, 
  Medal,
  Gift,
  Clock
} from "lucide-react";

// Mock data
const userData = {
  balance: 12500,
  dailyEarned: 150,
  streak: 15,
  rank: 42,
  totalUsers: 10000,
};

const dailyChallenges = [
  {
    id: "1",
    title: "Vote on 3 dApps",
    progress: 1,
    maxProgress: 3,
    reward: 50,
    timeLeft: "6h 30m"
  },
  {
    id: "2", 
    title: "Complete a tutorial",
    progress: 0,
    maxProgress: 1,
    reward: 100,
    timeLeft: "6h 30m"
  },
  {
    id: "3",
    title: "Share achievement", 
    progress: 0,
    maxProgress: 1,
    reward: 25,
    timeLeft: "6h 30m"
  }
];

const recentActivity = [
  { action: "Voted on SushiSwap", reward: 25, time: "2h ago" },
  { action: "Completed tutorial", reward: 100, time: "1d ago" },
  { action: "Daily check-in", reward: 10, time: "1d ago" },
  { action: "Referred friend", reward: 200, time: "2d ago" },
];

export default function Rewards() {
  return (
    <div className="min-h-screen bg-background p-4 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-foreground">Rewards Center</h1>
        <p className="text-mobile-sm text-muted-foreground">
          Track your CP, collect NFTs, and unlock achievements
        </p>
      </div>

      {/* CP Balance Card */}
      <CPBalanceCard 
        balance={userData.balance}
        dailyEarned={userData.dailyEarned}
        streak={userData.streak}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 bg-gradient-card border-border/50 text-center">
          <Trophy className="h-5 w-5 text-accent mx-auto mb-1" />
          <p className="text-mobile-xs text-muted-foreground">Rank</p>
          <p className="text-mobile-sm font-semibold text-foreground">
            #{userData.rank}
          </p>
        </Card>
        
        <Card className="p-3 bg-gradient-card border-border/50 text-center">
          <Medal className="h-5 w-5 text-primary mx-auto mb-1" />
          <p className="text-mobile-xs text-muted-foreground">NFTs</p>
          <p className="text-mobile-sm font-semibold text-foreground">3</p>
        </Card>
        
        <Card className="p-3 bg-gradient-card border-border/50 text-center">
          <Target className="h-5 w-5 text-success mx-auto mb-1" />
          <p className="text-mobile-xs text-muted-foreground">Complete</p>
          <p className="text-mobile-sm font-semibold text-foreground">75%</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-card">
          <TabsTrigger value="overview" className="text-mobile-xs">Overview</TabsTrigger>
          <TabsTrigger value="nfts" className="text-mobile-xs">NFTs</TabsTrigger>
          <TabsTrigger value="achievements" className="text-mobile-xs">Badges</TabsTrigger>
          <TabsTrigger value="activity" className="text-mobile-xs">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Daily Challenges */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-mobile-base font-semibold text-foreground">
                Daily Challenges
              </h3>
              <Badge variant="outline" className="text-mobile-xs">
                <Clock className="h-3 w-3 mr-1" />
                6h 30m left
              </Badge>
            </div>
            
            <div className="space-y-2">
              {dailyChallenges.map((challenge) => (
                <Card key={challenge.id} className="p-3 bg-gradient-card border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-mobile-sm font-medium text-foreground">
                        {challenge.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 bg-muted rounded-full h-1.5">
                          <div 
                            className="bg-primary h-full rounded-full transition-all"
                            style={{ 
                              width: `${(challenge.progress / challenge.maxProgress) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-mobile-xs text-muted-foreground">
                          {challenge.progress}/{challenge.maxProgress}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3 text-right">
                      <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs">
                        +{challenge.reward} CP
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity Preview */}
          <div className="space-y-3">
            <h3 className="text-mobile-base font-semibold text-foreground">
              Recent Activity
            </h3>
            <div className="space-y-2">
              {recentActivity.slice(0, 3).map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="text-mobile-sm text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-mobile-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs">
                    +{activity.reward} CP
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nfts" className="space-y-4">
          <NFTGallery />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <AchievementGrid />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <Card key={index} className="p-3 bg-gradient-card border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-mobile-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-mobile-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs">
                    +{activity.reward} CP
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}