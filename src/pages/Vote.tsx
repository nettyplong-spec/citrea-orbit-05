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
      <div className="bg-gradient-primary p-4 pb-6">
        <div className="space-y-3">
          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold text-white">Vote & Earn</h1>
            <p className="text-mobile-sm text-white/80">
              Cast votes on dApps and governance proposals
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 bg-white/10 border-white/20 text-center">
              <Zap className="h-4 w-4 text-accent mx-auto mb-1" />
              <p className="text-mobile-xs text-white/80">Earned</p>
              <p className="text-mobile-sm font-bold text-white">
                {myTotalRewards} CP
              </p>
            </Card>
            
            <Card className="p-3 bg-white/10 border-white/20 text-center">
              <TrendingUp className="h-4 w-4 text-white mx-auto mb-1" />
              <p className="text-mobile-xs text-white/80">My Votes</p>
              <p className="text-mobile-sm font-bold text-white">
                {votingItems.filter(item => item.myVote).length}
              </p>
            </Card>
            
            <Card className="p-3 bg-white/10 border-white/20 text-center">
              <Users className="h-4 w-4 text-white mx-auto mb-1" />
              <p className="text-mobile-xs text-white/80">Accuracy</p>
              <p className="text-mobile-sm font-bold text-white">87%</p>
            </Card>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-2">
        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap text-mobile-xs"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Active Votes */}
        <div className="space-y-3">
          <h2 className="text-mobile-base font-semibold text-foreground flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-primary" />
            Active Votes
          </h2>
          
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const upvotePercentage = item.totalVotes > 0 ? (item.upvotes / item.totalVotes) * 100 : 0;
              
              return (
                <Card key={item.id} className="p-4 bg-gradient-card border-border/50">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-mobile-xs">
                            {item.category}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className="text-mobile-xs flex items-center space-x-1"
                          >
                            <Clock className="h-3 w-3" />
                            <span>{item.timeLeft}</span>
                          </Badge>
                        </div>
                        
                        <h3 className="text-mobile-sm font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-mobile-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      
                      {item.image && (
                        <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden ml-3">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    {/* Vote Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-mobile-xs text-muted-foreground">
                        <span>{item.upvotes} upvotes</span>
                        <span>{item.downvotes} downvotes</span>
                      </div>
                      
                      <Progress value={upvotePercentage} className="h-1.5" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-mobile-xs text-muted-foreground">
                          {item.totalVotes} total votes
                        </span>
                        <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs">
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
                        className="flex-1 text-mobile-xs"
                        disabled={!!item.myVote && item.myVote !== "up"}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Upvote
                      </Button>
                      
                      <Button
                        variant={item.myVote === "down" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleVote(item.id, "down")}
                        className="flex-1 text-mobile-xs"
                        disabled={!!item.myVote && item.myVote !== "down"}
                      >
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        Downvote
                      </Button>
                    </div>
                    
                    {item.myVote && (
                      <div className="text-center">
                        <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs">
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
    </div>
  );
}