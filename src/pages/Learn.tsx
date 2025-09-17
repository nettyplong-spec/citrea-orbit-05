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
      <div className="bg-gradient-primary p-4 md:px-6 lg:px-8 pb-6">
        <div className="space-y-3">
          <div className="text-center space-y-1">
            <h1 className="text-xl md:text-2xl font-bold text-white">{t('learn')}</h1>
            <p className="text-mobile-sm md:text-base text-white/80">
              Master blockchain development and earn CP rewards
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
            <Card className="p-3 md:p-4 bg-white/10 border-white/20 text-center">
              <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-accent mx-auto mb-1" />
              <p className="text-mobile-xs md:text-sm text-white/80">Completed</p>
              <p className="text-mobile-sm md:text-base font-bold text-white">
                {completedCourses}
              </p>
            </Card>
            
            <Card className="p-3 md:p-4 bg-white/10 border-white/20 text-center">
              <Award className="h-4 w-4 md:h-5 md:w-5 text-white mx-auto mb-1" />
              <p className="text-mobile-xs md:text-sm text-white/80">Earned</p>
              <p className="text-mobile-sm md:text-base font-bold text-white">
                {totalRewards} CP
              </p>
            </Card>
            
            <Card className="p-3 md:p-4 bg-white/10 border-white/20 text-center">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-white mx-auto mb-1" />
              <p className="text-mobile-xs md:text-sm text-white/80">Progress</p>
              <p className="text-mobile-sm md:text-base font-bold text-white">85%</p>
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

            {/* Continue Learning */}
            {mockCourses.some(course => course.progress && course.progress > 0 && !course.completed) && (
              <div className="space-y-3">
                <h2 className="text-mobile-base md:text-lg font-semibold text-foreground">Continue Learning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  {mockCourses
                    .filter(course => course.progress && course.progress > 0 && !course.completed)
                    .map((course) => (
                      <Card key={course.id} className="p-4 bg-gradient-card border-border/50">
                        <div className="flex space-x-3">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-lg overflow-hidden">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="space-y-1">
                              <h3 className="text-mobile-sm md:text-base font-semibold text-foreground">
                                {course.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Badge className={getDifficultyColor(course.difficulty) + " text-mobile-xs md:text-sm"}>
                                  {course.difficulty}
                                </Badge>
                                <span className="text-mobile-xs md:text-sm text-muted-foreground">
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-mobile-xs md:text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="text-foreground">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-1.5 md:h-2" />
                            </div>
                            
                            <Button size="sm" className="text-mobile-xs md:text-sm">
                              <Play className="h-3 w-3 mr-1" />
                              Continue
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  }
                </div>
              </div>
            )}

            {/* All Courses */}
            <div className="space-y-3">
              <h2 className="text-mobile-base md:text-lg font-semibold text-foreground">All Courses</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="p-4 bg-gradient-card border-border/50 interactive-scale">
                    <div className="flex space-x-3">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-lg overflow-hidden relative">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        {course.completed && (
                          <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-success" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="space-y-1">
                          <h3 className="text-mobile-sm md:text-base font-semibold text-foreground">
                            {course.title}
                          </h3>
                          <p className="text-mobile-xs md:text-sm text-muted-foreground line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-wrap">
                          <Badge className={getDifficultyColor(course.difficulty) + " text-mobile-xs md:text-sm"}>
                            {course.difficulty}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-mobile-xs md:text-sm text-muted-foreground">
                              {course.duration}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-accent fill-current" />
                              <span className="text-mobile-xs md:text-sm text-foreground">{course.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-mobile-xs md:text-sm text-muted-foreground">
                                {course.enrolled.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          <Badge className="bg-accent/20 text-accent border-0 text-mobile-xs md:text-sm">
                            +{course.rewards} CP
                          </Badge>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant={course.completed ? "outline" : "default"}
                          className="text-mobile-xs md:text-sm"
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

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            {/* Quick Stats */}
            <Card className="p-4 bg-gradient-card border-border/50">
              <h3 className="text-base font-semibold text-foreground mb-3">Learning Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Courses</span>
                  <span className="text-sm font-medium text-foreground">{mockCourses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="text-sm font-medium text-foreground">{completedCourses}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <span className="text-sm font-medium text-foreground">
                    {mockCourses.filter(c => c.progress && c.progress > 0 && !c.completed).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total CP Earned</span>
                  <span className="text-sm font-medium text-accent">{totalRewards}</span>
                </div>
              </div>
            </Card>

            {/* Popular Courses */}
            <Card className="p-4 bg-gradient-card border-border/50">
              <h3 className="text-base font-semibold text-foreground mb-3">Popular This Week</h3>
              <div className="space-y-3">
                {mockCourses.slice(0, 3).map((course, index) => (
                  <div key={course.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{course.title}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-accent fill-current" />
                          <span className="text-xs text-foreground">{course.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {course.enrolled.toLocaleString()} enrolled
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Path */}
            <Card className="p-4 bg-gradient-card border-border/50">
              <h3 className="text-base font-semibold text-foreground mb-3">Recommended Path</h3>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Based on your progress, we recommend:
                </div>
                <div className="space-y-2">
                  {["Blockchain Basics", "Smart Contracts", "DeFi Protocols"].map((step, index) => (
                    <div key={step} className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-primary text-primary-foreground' : 
                        index === 1 ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}