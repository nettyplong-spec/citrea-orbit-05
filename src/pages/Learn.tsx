import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users,
  Award,
  TrendingUp,
  ChevronRight,
  Star,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  enrolled: number;
  rating: number;
  progress?: number;
  completed?: boolean;
  rewards: number;
  category: string;
  image: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Bitcoin Layer 2 Fundamentals",
    description: "Learn the basics of Bitcoin Layer 2 solutions and how they work",
    duration: "2h 30m",
    difficulty: "Beginner",
    enrolled: 1250,
    rating: 4.8,
    progress: 65,
    rewards: 100,
    category: "Blockchain Basics",
    image: "/placeholder.svg"
  },
  {
    id: "2", 
    title: "Citrea Development Guide",
    description: "Complete guide to building dApps on the Citrea ecosystem",
    duration: "4h 15m",
    difficulty: "Intermediate",
    enrolled: 850,
    rating: 4.9,
    progress: 0,
    rewards: 200,
    category: "Development",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    title: "DeFi Security Best Practices",
    description: "Essential security practices for DeFi interactions",
    duration: "1h 45m",
    difficulty: "Intermediate", 
    enrolled: 2100,
    rating: 4.7,
    completed: true,
    rewards: 150,
    category: "Security",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Smart Contract Auditing",
    description: "Advanced techniques for smart contract security analysis",
    duration: "6h 20m",
    difficulty: "Advanced",
    enrolled: 420,
    rating: 4.9,
    rewards: 300,
    category: "Security",
    image: "/placeholder.svg"
  }
];

const categories = ["All", "Blockchain Basics", "Development", "Security", "DeFi", "NFTs"];

export default function Learn() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredCourses = mockCourses.filter(course =>
    selectedCategory === "All" || course.category === selectedCategory
  );

  const completedCourses = mockCourses.filter(course => course.completed).length;
  const totalRewards = mockCourses
    .filter(course => course.completed)
    .reduce((sum, course) => sum + course.rewards, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/20 text-success";
      case "Intermediate": return "bg-warning/20 text-warning";  
      case "Advanced": return "bg-destructive/20 text-destructive";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 pb-6">
        <div className="space-y-3">
          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold text-white">{t('learn')}</h1>
            <p className="text-mobile-sm text-white/80">
              Master blockchain development and earn CP rewards
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 bg-white/10 border-white/20 text-center">
              <BookOpen className="h-4 w-4 text-accent mx-auto mb-1" />
              <p className="text-mobile-xs text-white/80">Completed</p>
              <p className="text-mobile-sm font-bold text-white">
                {completedCourses}
              </p>
            </Card>
            
            <Card className="p-3 bg-white/10 border-white/20 text-center">
              <Award className="h-4 w-4 text-white mx-auto mb-1" />
              <p className="text-mobile-xs text-white/80">Earned</p>
              <p className="text-mobile-sm font-bold text-white">
                {totalRewards} CP
              </p>
            </Card>
            
            <Card className="p-3 bg-white/10 border-white/20 text-center">
              <TrendingUp className="h-4 w-4 text-white mx-auto mb-1" />
              <p className="text-mobile-xs text-white/80">Progress</p>
              <p className="text-mobile-sm font-bold text-white">85%</p>
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

        {/* Continue Learning */}
        {mockCourses.some(course => course.progress && course.progress > 0 && !course.completed) && (
          <div className="space-y-3">
            <h2 className="text-mobile-base font-semibold text-foreground">Continue Learning</h2>
            {mockCourses
              .filter(course => course.progress && course.progress > 0 && !course.completed)
              .map((course) => (
                <Card key={course.id} className="p-4 bg-gradient-card border-border/50">
                  <div className="flex space-x-3">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="space-y-1">
                        <h3 className="text-mobile-sm font-semibold text-foreground">
                          {course.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor(course.difficulty) + " text-mobile-xs"}>
                            {course.difficulty}
                          </Badge>
                          <span className="text-mobile-xs text-muted-foreground">
                            {course.duration}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-mobile-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                      
                      <Button size="sm" className="text-mobile-xs">
                        <Play className="h-3 w-3 mr-1" />
                        Continue
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            }
          </div>
        )}

        {/* All Courses */}
        <div className="space-y-3">
          <h2 className="text-mobile-base font-semibold text-foreground">All Courses</h2>
          
          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="p-4 bg-gradient-card border-border/50 interactive-scale">
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    {course.completed && (
                      <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-success" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-mobile-sm font-semibold text-foreground">
                        {course.title}
                      </h3>
                      <p className="text-mobile-xs text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-wrap">
                      <Badge className={getDifficultyColor(course.difficulty) + " text-mobile-xs"}>
                        {course.difficulty}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-mobile-xs text-muted-foreground">
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-accent fill-current" />
                          <span className="text-mobile-xs text-foreground">{course.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-mobile-xs text-muted-foreground">
                            {course.enrolled.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs">
                        +{course.rewards} CP
                      </Badge>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant={course.completed ? "outline" : "default"}
                      className="text-mobile-xs"
                      disabled={course.completed}
                    >
                      {course.completed ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </>
                      ) : course.progress && course.progress > 0 ? (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Continue
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Start Course
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}