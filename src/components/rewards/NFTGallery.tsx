import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star } from "lucide-react";

interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  collection: string;
}

const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Citrea Explorer",
    image: "/placeholder.svg",
    rarity: "rare",
    collection: "Genesis",
  },
  {
    id: "2", 
    name: "Vote Master",
    image: "/placeholder.svg",
    rarity: "epic",
    collection: "Governance",
  },
  {
    id: "3",
    name: "Learning Hero",
    image: "/placeholder.svg",
    rarity: "legendary",
    collection: "Education",
  },
];

const rarityConfig = {
  common: { color: "bg-muted", textColor: "text-muted-foreground" },
  rare: { color: "bg-primary/20", textColor: "text-primary" },
  epic: { color: "bg-accent/20", textColor: "text-accent" },
  legendary: { color: "bg-gradient-rewards", textColor: "text-white" },
};

export const NFTGallery = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-mobile-base font-semibold text-foreground">
          My NFTs
        </h3>
        <Badge variant="secondary" className="text-mobile-xs">
          {mockNFTs.length} collected
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {mockNFTs.map((nft) => {
          const rarity = rarityConfig[nft.rarity];
          
          return (
            <Card 
              key={nft.id} 
              className="p-3 bg-gradient-card border-border/50 interactive-scale cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                  <img 
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    {nft.rarity === "legendary" && (
                      <Star className="h-3 w-3 text-accent animate-pulse-glow" />
                    )}
                    {nft.rarity === "epic" && (
                      <Sparkles className="h-3 w-3 text-accent" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-mobile-sm font-medium text-foreground truncate">
                    {nft.name}
                  </p>
                  <p className="text-mobile-xs text-muted-foreground">
                    {nft.collection}
                  </p>
                  <Badge 
                    className={`text-mobile-xs ${rarity.color} ${rarity.textColor} border-0`}
                  >
                    {nft.rarity}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};