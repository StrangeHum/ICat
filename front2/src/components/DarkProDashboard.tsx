import { useState } from 'react';
import { 
  ListTodo, 
  Clock, 
  FileText, 
  Package, 
  Settings, 
  Search, 
  Bell, 
  User,
  Filter,
  Clock3,
  AlertCircle,
  MessageSquare,
  Phone,
  Monitor,
  TrendingUp,
  ChevronRight,
  Zap,
  Activity,
  Terminal,
  Database,
  Circle
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function DarkProDashboard() {
  const [activeSection, setActiveSection] = useState('tasks');

  const tasks = [
    {
      id: 'TK-4521',
      title: 'Ошибка синхронизации с iiko Server',
      client: 'Ресторан "Вкусно"',
      status: 'critical',
      priority: 'high',
      assignee: 'Иван П.',
      avatar: 'ИП',
      date: '10 ноя, 14:32',
      type: 'Техническая',
      anydeskId: '987 654 321',
      messages: 5,
      uptime: '2h 45m'
    },
    {
      id: 'TK-4520',
      title: 'Не печатается чек на кухне',
      client: 'Кафе "Уют"',
      status: 'active',
      priority: 'medium',
      assignee: 'Анна С.',
      avatar: 'АС',
      date: '10 ноя, 13:15',
      type: 'Оборудование',
      anydeskId: '456 789 123',
      messages: 2,
      uptime: '4h 12m'
    },
    {
      id: 'TK-4519',
      title: 'Обновление до версии 7.5.2',
      client: 'Сеть "Пицца+"',
      status: 'pending',
      priority: 'low',
      assignee: 'Не назначен',
      avatar: '--',
      date: '10 ноя, 11:20',
      type: 'Обновление',
      anydeskId: '123 456 789',
      messages: 0,
      uptime: '6h 30m'
    },
    {
      id: 'TK-4518',
      title: 'Запрос на консультацию по API',
      client: 'ООО "ТехСервис"',
      status: 'waiting',
      priority: 'medium',
      assignee: 'Сергей К.',
      avatar: 'СК',
      date: '10 ноя, 10:05',
      type: 'Консультация',
      anydeskId: '789 123 456',
      messages: 1,
      uptime: '7h 55m'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'pending': return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
      case 'waiting': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'critical': return 'CRITICAL';
      case 'active': return 'ACTIVE';
      case 'pending': return 'PENDING';
      case 'waiting': return 'WAITING';
      default: return status.toUpperCase();
    }
  };

  const getPriorityIndicator = (priority: string) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-amber-500',
      low: 'bg-emerald-500'
    };
    return colors[priority as keyof typeof colors] || 'bg-slate-500';
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-slate-100">iiko.SUPPORT</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">v2.4.1</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveSection('tasks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
              activeSection === 'tasks' 
                ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <ListTodo className="w-5 h-5" />
            <span>Tasks</span>
            <Badge variant="secondary" className="ml-auto bg-slate-800 text-cyan-400 border-slate-700">24</Badge>
          </button>
          
          <button
            onClick={() => setActiveSection('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
              activeSection === 'history' 
                ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>History</span>
          </button>
          
          <button
            onClick={() => setActiveSection('docs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
              activeSection === 'docs' 
                ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Docs</span>
          </button>
          
          <button
            onClick={() => setActiveSection('tools')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
              activeSection === 'tools' 
                ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Tools</span>
          </button>
          
          <button
            onClick={() => setActiveSection('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
              activeSection === 'profile' 
                ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">System Status</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">API</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Circle className="w-2 h-2 fill-current" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Queue</span>
                <span className="text-slate-300 font-mono">42 msg</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Load</span>
                <span className="text-slate-300 font-mono">68%</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
              <Input 
                placeholder="Search tasks, clients, IDs..." 
                className="pl-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-800">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <Avatar className="border border-slate-700">
                <AvatarFallback className="bg-slate-800 text-cyan-400">ИП</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-slate-200">Иван Петров</p>
                <p className="text-xs text-slate-500 font-mono">sr.engineer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-slate-950">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-slate-100">Active Tasks</h2>
                  <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                    24 открыто
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 font-mono">Real-time monitoring // RabbitMQ sync</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40 bg-slate-900 border-slate-700 text-slate-300">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="waiting">Waiting</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="gap-2 bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                
                <Button className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950">
                  <Zap className="w-4 h-4" />
                  Quick Actions
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-1 h-full rounded-full ${getPriorityIndicator(task.priority)}`}></div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs font-mono text-slate-500">{task.id}</span>
                              <Badge className={getStatusColor(task.status)}>
                                {getStatusLabel(task.status)}
                              </Badge>
                              <span className="text-xs text-slate-600">|</span>
                              <span className="text-xs font-mono text-slate-500">{task.uptime}</span>
                            </div>
                            <h3 className="text-slate-100 mb-1">{task.title}</h3>
                            <p className="text-sm text-slate-400">{task.client}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-2 hover:bg-slate-800 text-slate-400">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-xs">{task.messages}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-slate-800 text-slate-400">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-slate-800 text-slate-400">
                              <Monitor className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-800">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 border border-slate-700">
                              <AvatarFallback className="bg-slate-800 text-xs text-cyan-400">
                                {task.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-slate-400">{task.assignee}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock className="w-4 h-4" />
                            <span className="font-mono text-xs">{task.date}</span>
                          </div>
                          
                          <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                            {task.type}
                          </Badge>
                          
                          <div className="ml-auto flex items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Monitor className="w-4 h-4" />
                              <span className="font-mono text-xs">{task.anydeskId}</span>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-2 bg-slate-800 border-slate-700 hover:bg-slate-700 text-cyan-400"
                            >
                              Open
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Terminal-style quick stats */}
            <div className="mt-8 grid grid-cols-4 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-mono mb-1">SOLVED_TODAY</p>
                      <p className="text-2xl text-emerald-400 font-mono">18</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-emerald-500/50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-mono mb-1">AVG_TIME</p>
                      <p className="text-2xl text-cyan-400 font-mono">38m</p>
                    </div>
                    <Clock className="w-8 h-8 text-cyan-500/50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-mono mb-1">QUEUE_SIZE</p>
                      <p className="text-2xl text-amber-400 font-mono">42</p>
                    </div>
                    <Database className="w-8 h-8 text-amber-500/50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-mono mb-1">MY_RATING</p>
                      <p className="text-2xl text-purple-400 font-mono">4.8</p>
                    </div>
                    <Zap className="w-8 h-8 text-purple-500/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
