import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  TrendingUp,
  Clock,
  Users,
  Zap
} from "lucide-react";

interface VotingItem {
  id: string;
  type: "dapp" | "proposal";
  title: string;
  description: string;
  image?: string;
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  myVote?: "up" | "down" | null;
  reward: number;
  timeLeft: string;
  category: string;
}

const mockVotingItems: VotingItem[] = [
  {
    id: "1",
    type: "dapp",
    title: "List Compound Protocol",
    description: "Should we add Compound to the discovery platform?",
    image: "/placeholder.svg",
    upvotes: 450,
    downvotes: 23,
    totalVotes: 473,
    myVote: null,
    reward: 50,
    timeLeft: "2d 14h",
    category: "DeFi"
  },
  {
    id: "2", 
    type: "proposal",
    title: "Increase CP Rewards",
    description: "Proposal to increase daily CP rewards by 25%",
    upvotes: 1200,
    downvotes: 340,
    totalVotes: 1540,
    myVote: "up",
    reward: 75,
    timeLeft: "5d 8h",
    category: "Governance"
  },
  {
    id: "3",
    type: "dapp", 
    title: "Rate SushiSwap Update",
    description: "How do you rate the latest SushiSwap v3 features?",
    image: "/placeholder.svg",
    upvotes: 890,
    downvotes: 110,
    totalVotes: 1000,
    myVote: null,
    reward: 40,
    timeLeft: "1d 5h",
    category: "DeFi"
  }
];

const categories = ["All", "DeFi", "NFT", "Governance", "Infrastructure"];

export default function Vote() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [votingItems, setVotingItems] = useState(mockVotingItems);

  const handleVote = (itemId: string, voteType: "up" | "down") => {
    setVotingItems(items => 
      items.map(item => {
        if (item.id === itemId) {
          const wasUpvote = item.myVote === "up";
          const wasDownvote = item.myVote === "down";
          const isUpvote = voteType === "up";
          
          let newUpvotes = item.upvotes;
          let newDownvotes = item.downvotes;
          
          // Remove previous vote
          if (wasUpvote) newUpvotes -= 1;
          if (wasDownvote) newDownvotes -= 1;
          
          // Add new vote if different from previous
          if (item.myVote !== voteType) {
            if (isUpvote) newUpvotes += 1;
            else newDownvotes += 1;
          }
          
          return {
            ...item,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            totalVotes: newUpvotes + newDownvotes,
            myVote: item.myVote === voteType ? null : voteType
          };
        }
        return item;
      })
    );
  };

  const filteredItems = votingItems.filter(item => 
    selectedCategory === "All" || item.category === selectedCategory
  );

  const myTotalRewards = votingItems
    .filter(item => item.myVote)
    .reduce((sum, item) => sum + item.reward, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 md:px-6 lg:px-8 pb-6">
        <div className="space-y-3">
          <div className="text-center space-y-1">
            <h1 className="text-xl md:text-2xl font-bold text-white">Vote & Earn</h1>
            <p className="text-mobile-sm md:text-base text-white/80">
              Cast votes on dApps and governance proposals
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
            <Card className="p-3 md:p-4 bg-white/10 border-white/20 text-center">
              <Zap className="h-4 w-4 md:h-5 md:w-5 text-accent mx-auto mb-1" />
              <p className="text-mobile-xs md:text-sm text-white/80">Earned</p>
              <p className="text-mobile-sm md:text-base font-bold text-white">
                {myTotalRewards} CP
              </p>
            </Card>
            
            <Card className="p-3 md:p-4 bg-white/10 border-white/20 text-center">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-white mx-auto mb-1" />
              <p className="text-mobile-xs md:text-sm text-white/80">My Votes</p>
              <p className="text-mobile-sm md:text-base font-bold text-white">
                {votingItems.filter(item => item.myVote).length}
              </p>
            </Card>
            
            <Card className="p-3 md:p-4 bg-white/10 border-white/20 text-center">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-white mx-auto mb-1" />
              <p className="text-mobile-xs md:text-sm text-white/80">Accuracy</p>
              <p className="text-mobile-sm md:text-base font-bold text-white">87%</p>
            </Card>
          </div>
        </div>
      </div>

      <div className="p-4 md:px-6 lg:px-8 space-y-4 -mt-2">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Category Filters */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap text-mobile-xs md:text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Active Votes */}
            <div className="space-y-3">
              <h2 className="text-mobile-base md:text-lg font-semibold text-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                Active Votes
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {filteredItems.map((item) => {
                  const upvotePercentage = item.totalVotes > 0 ? (item.upvotes / item.totalVotes) * 100 : 0;
                  
                  return (
                    <Card key={item.id} className="p-4 bg-gradient-card border-border/50">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline" className="text-mobile-xs md:text-sm">
                                {item.category}
                              </Badge>
                              <Badge 
                                variant="secondary" 
                                className="text-mobile-xs md:text-sm flex items-center space-x-1"
                              >
                                <Clock className="h-3 w-3" />
                                <span>{item.timeLeft}</span>
                              </Badge>
                            </div>
                            
                            <h3 className="text-mobile-sm md:text-base font-semibold text-foreground mb-1">
                              {item.title}
                            </h3>
                            <p className="text-mobile-xs md:text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          
                          {item.image && (
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg overflow-hidden ml-3">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        {/* Vote Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-mobile-xs md:text-sm text-muted-foreground">
                            <span>{item.upvotes} upvotes</span>
                            <span>{item.downvotes} downvotes</span>
                          </div>
                          
                          <Progress value={upvotePercentage} className="h-1.5 md:h-2" />
                          
                          <div className="flex items-center justify-between">
                            <span className="text-mobile-xs md:text-sm text-muted-foreground">
                              {item.totalVotes} total votes
                            </span>
                            <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs md:text-sm">
                              +{item.reward} CP
                            </Badge>
                          </div>
                        </div>

                        {/* Vote Buttons */}
                        <div className="flex space-x-2">
                          <Button
                            variant={item.myVote === "up" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleVote(item.id, "up")}
                            className="flex-1 text-mobile-xs md:text-sm"
                            disabled={!!item.myVote && item.myVote !== "up"}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Upvote
                          </Button>
                          
                          <Button
                            variant={item.myVote === "down" ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => handleVote(item.id, "down")}
                            className="flex-1 text-mobile-xs md:text-sm"
                            disabled={!!item.myVote && item.myVote !== "down"}
                          >
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            Downvote
                          </Button>
                        </div>
                        
                        {item.myVote && (
                          <div className="text-center">
                            <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs md:text-sm">
                              Vote recorded! +{item.reward} CP earned
                            </Badge>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            {/* Voting Stats */}
            <Card className="p-4 bg-gradient-card border-border/50">
              <h3 className="text-base font-semibold text-foreground mb-3">Your Voting Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Votes Cast</span>
                  <span className="text-sm font-medium text-foreground">
                    {votingItems.filter(item => item.myVote).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CP Earned</span>
                  <span className="text-sm font-medium text-accent">{myTotalRewards}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Voting Accuracy</span>
                  <span className="text-sm font-medium text-success">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Streak</span>
                  <span className="text-sm font-medium text-foreground">5 days</span>
                </div>
              </div>
            </Card>

            {/* Recent Votes */}
            <Card className="p-4 bg-gradient-card border-border/50">
              <h3 className="text-base font-semibold text-foreground mb-3">Recent Votes</h3>
              <div className="space-y-3">
                {votingItems.filter(item => item.myVote).slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.myVote === 'up' ? 'bg-success/20' : 'bg-destructive/20'
                    }`}>
                      {item.myVote === 'up' ? 
                        <ThumbsUp className="h-3 w-3 text-success" /> : 
                        <ThumbsDown className="h-3 w-3 text-destructive" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        <span className="text-xs text-accent">+{item.reward} CP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="p-4 bg-gradient-card border-border/50">
              <h3 className="text-base font-semibold text-foreground mb-3">Trending Topics</h3>
              <div className="space-y-2">
                {["DeFi", "NFT", "Governance"].map((topic, index) => (
                  <div key={topic} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{topic}</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-xs text-muted-foreground">
                        {15 - index * 3} votes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}