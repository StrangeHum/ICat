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
  AlertCircle,
  MessageSquare,
  Phone,
  Monitor,
  ChevronRight,
  Sparkles,
  Brain,
  Lightbulb,
  BookOpen,
  Zap,
  TrendingUp,
  Target,
  CheckCircle2,
  History,
  Link2
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function AIAssistiveDashboard() {
  const [activeSection, setActiveSection] = useState('tasks');
  const [selectedTask, setSelectedTask] = useState('TK-4521');

  const tasks = [
    {
      id: 'TK-4521',
      title: 'Ошибка синхронизации с iiko Server',
      client: 'Ресторан "Вкусно"',
      status: 'urgent',
      priority: 'high',
      assignee: 'Иван П.',
      avatar: 'ИП',
      date: '10 ноя, 14:32',
      type: 'Техническая',
      anydeskId: '987 654 321',
      messages: 5,
      aiConfidence: 92,
      suggestedSolution: true
    },
    {
      id: 'TK-4520',
      title: 'Не печатается чек на кухне',
      client: 'Кафе "Уют"',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Анна С.',
      avatar: 'АС',
      date: '10 ноя, 13:15',
      type: 'Оборудование',
      anydeskId: '456 789 123',
      messages: 2,
      aiConfidence: 85,
      suggestedSolution: true
    },
    {
      id: 'TK-4519',
      title: 'Обновление до версии 7.5.2',
      client: 'Сеть "Пицца+"',
      status: 'new',
      priority: 'low',
      assignee: 'Не назначен',
      avatar: '--',
      date: '10 ноя, 11:20',
      type: 'Обновление',
      anydeskId: '123 456 789',
      messages: 0,
      aiConfidence: 78,
      suggestedSolution: false
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
      aiConfidence: 95,
      suggestedSolution: true
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-300';
      case 'in-progress': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'waiting': return 'bg-amber-100 text-amber-700 border-amber-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'urgent': return 'Срочно';
      case 'in-progress': return 'В работе';
      case 'new': return 'Новая';
      case 'waiting': return 'Ожидание';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-purple-200/50 flex flex-col">
        <div className="p-6 border-b border-purple-200/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-gray-900">iiko AI Support</h1>
          </div>
          <p className="text-xs text-purple-600 flex items-center gap-1">
            <Brain className="w-3 h-3" />
            AI-Powered Panel
          </p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveSection('tasks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'tasks' 
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <ListTodo className="w-5 h-5" />
            <span>Все задачи</span>
            <Badge variant="secondary" className="ml-auto bg-white/20">24</Badge>
          </button>
          
          <button
            onClick={() => setActiveSection('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'history' 
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>История решений</span>
          </button>
          
          <button
            onClick={() => setActiveSection('docs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'docs' 
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Документация</span>
          </button>
          
          <button
            onClick={() => setActiveSection('tools')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'tools' 
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Полезные инструменты</span>
          </button>
          
          <button
            onClick={() => setActiveSection('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'profile' 
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Профиль / KPI</span>
          </button>
        </nav>

        <div className="p-4 border-t border-purple-200/50">
          <Card className="bg-gradient-to-br from-purple-500 to-violet-600 border-0 text-white shadow-lg shadow-purple-500/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm mb-1">AI Помощник активен</p>
                  <p className="text-xs text-purple-100">Анализирую задачи в реальном времени</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-purple-200/50 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <Input 
                placeholder="Спросите AI или найдите задачу..." 
                className="pl-10 pr-10 bg-purple-50/50 border-purple-200 focus:border-purple-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-purple-200">
              <Avatar className="border-2 border-purple-200">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                  ИП
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-gray-900">Иван Петров</p>
                <p className="text-xs text-purple-600 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  98% эффективность
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* AI Insight Banner */}
            <Card className="mb-6 bg-gradient-to-r from-purple-500 to-violet-600 border-0 text-white shadow-xl shadow-purple-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="mb-1">AI обнаружил паттерн</h3>
                      <p className="text-sm text-purple-100">
                        5 похожих проблем решены за последние 2 дня. Средний срок решения: 35 минут
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" className="bg-white text-purple-700 hover:bg-purple-50 gap-2">
                    <Sparkles className="w-4 h-4" />
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 mb-1">Все задачи</h2>
                <p className="text-sm text-purple-600 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI активно помогает с 12 задачами
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Select defaultValue="ai-priority">
                  <SelectTrigger className="w-48 border-purple-200">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-priority">AI приоритет</SelectItem>
                    <SelectItem value="date">По дате</SelectItem>
                    <SelectItem value="status">По статусу</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="gap-2 border-purple-200 hover:bg-purple-50">
                  <Filter className="w-4 h-4" />
                  Фильтры
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <Card 
                  key={task.id} 
                  className={`hover:shadow-lg transition-all border-2 cursor-pointer ${
                    selectedTask === task.id 
                      ? 'border-purple-400 shadow-lg shadow-purple-500/20' 
                      : 'border-purple-100 hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedTask(task.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {task.suggestedSolution && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm text-gray-500">{task.id}</span>
                              <Badge className={getStatusColor(task.status)}>
                                {getStatusLabel(task.status)}
                              </Badge>
                              {task.suggestedSolution && (
                                <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                                  <Lightbulb className="w-3 h-3 mr-1" />
                                  AI решение готово
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-gray-900 mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.client}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="text-right mr-4">
                              <p className="text-xs text-gray-500 mb-1">AI уверенность</p>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full"
                                    style={{ width: `${task.aiConfidence}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-purple-600">{task.aiConfidence}%</span>
                              </div>
                            </div>
                            
                            <Button variant="ghost" size="sm" className="gap-2 hover:bg-purple-50">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-xs">{task.messages}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-purple-50">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-purple-50">
                              <Monitor className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-purple-100">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                                {task.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{task.assignee}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{task.date}</span>
                          </div>
                          
                          <Badge variant="outline" className="text-xs border-purple-200">
                            {task.type}
                          </Badge>
                          
                          <div className="ml-auto flex items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Monitor className="w-4 h-4" />
                              <span className="font-mono text-xs">{task.anydeskId}</span>
                            </div>
                            
                            <Button 
                              size="sm" 
                              className="gap-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white"
                            >
                              Открыть
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
          </div>
        </main>
      </div>

      {/* Right Sidebar - AI Assistant */}
      <aside className="w-96 bg-white/80 backdrop-blur-xl border-l border-purple-200/50 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              AI Ассистент
            </h3>
            <Badge className="bg-green-100 text-green-700 border-green-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Активен
            </Badge>
          </div>
          
          <Tabs defaultValue="solution" className="mb-4">
            <TabsList className="grid w-full grid-cols-3 bg-purple-50">
              <TabsTrigger value="solution">Решение</TabsTrigger>
              <TabsTrigger value="similar">Похожие</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="solution" className="space-y-4">
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-sm text-purple-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Рекомендуемое решение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 text-white text-xs">
                        1
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 mb-1">Проверьте подключение к серверу</p>
                        <p className="text-xs text-gray-600">
                          В 87% случаев проблема связана с сетевым подключением
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 text-white text-xs">
                        2
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 mb-1">Обновите плагин синхронизации</p>
                        <p className="text-xs text-gray-600">
                          Версия 7.4.8 имеет известную проблему
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 text-white text-xs">
                        3
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 mb-1">Перезапустите службу iiko</p>
                        <p className="text-xs text-gray-600">
                          Среднее время решения: 12 минут
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Применить решение
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    Связанная документация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2 border-purple-200 hover:bg-purple-50">
                    <Link2 className="w-3 h-3" />
                    Синхронизация iiko Server 7.x
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2 border-purple-200 hover:bg-purple-50">
                    <Link2 className="w-3 h-3" />
                    Типичные ошибки подключения
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="similar" className="space-y-4">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <History className="w-4 h-4 text-purple-500" />
                    Похожие решённые задачи
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">TK-4401</span>
                      <Badge variant="outline" className="text-xs">Решено</Badge>
                    </div>
                    <p className="text-sm text-gray-900 mb-1">Ошибка синхронизации меню</p>
                    <p className="text-xs text-gray-600">Решено за 18 мин • Сходство: 94%</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">TK-4312</span>
                      <Badge variant="outline" className="text-xs">Решено</Badge>
                    </div>
                    <p className="text-sm text-gray-900 mb-1">Проблема с обновлением данных</p>
                    <p className="text-xs text-gray-600">Решено за 25 мин • Сходство: 89%</p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full gap-2 border-purple-200 hover:bg-purple-50">
                    Показать ещё
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    Аналитика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Тип проблемы</span>
                      <span className="text-sm text-gray-900">Сетевая (68%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[68%] bg-gradient-to-r from-purple-500 to-violet-600"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Прогноз времени</span>
                      <span className="text-sm text-gray-900">20-35 мин</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-800">
                      ⚠️ Клиент обращался 3 раза за месяц. Рекомендуется профилактический визит
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-sm">Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 border-purple-200 hover:bg-purple-50">
                <MessageSquare className="w-4 h-4" />
                Написать клиенту
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 border-purple-200 hover:bg-purple-50">
                <Monitor className="w-4 h-4" />
                Подключиться (AnyDesk)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 border-purple-200 hover:bg-purple-50">
                <Zap className="w-4 h-4" />
                Создать инцидент
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-sm text-purple-900">Ваша продуктивность</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Задач решено сегодня</span>
                <span className="text-purple-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Среднее время</span>
                <span className="text-purple-600">28 мин</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Рейтинг качества</span>
                <span className="text-purple-600">4.9/5.0</span>
              </div>
              <div className="pt-3 border-t border-purple-200">
                <p className="text-xs text-purple-700 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  На 15% быстрее среднего по команде!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
