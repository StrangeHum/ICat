import { useState } from 'react';
import { 
  LayoutDashboard, 
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
  CheckCircle2,
  MessageSquare,
  Phone,
  Monitor,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function LightModernDashboard() {
  const [activeSection, setActiveSection] = useState('tasks');

  const tasks = [
    {
      id: 'TK-4521',
      title: 'Ошибка синхронизации с iiko Server',
      client: 'Ресторан "Вкусно"',
      status: 'urgent',
      priority: 'high',
      assignee: 'Иван П.',
      date: '10 ноя, 14:32',
      type: 'Техническая',
      anydeskId: '987 654 321'
    },
    {
      id: 'TK-4520',
      title: 'Не печатается чек на кухне',
      client: 'Кафе "Уют"',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Анна С.',
      date: '10 ноя, 13:15',
      type: 'Оборудование',
      anydeskId: '456 789 123'
    },
    {
      id: 'TK-4519',
      title: 'Обновление до версии 7.5.2',
      client: 'Сеть "Пицца+"',
      status: 'new',
      priority: 'low',
      assignee: 'Не назначен',
      date: '10 ноя, 11:20',
      type: 'Обновление',
      anydeskId: '123 456 789'
    },
    {
      id: 'TK-4518',
      title: 'Запрос на консультацию по API',
      client: 'ООО "ТехСервис"',
      status: 'waiting',
      priority: 'medium',
      assignee: 'Сергей К.',
      date: '10 ноя, 10:05',
      type: 'Консультация',
      anydeskId: '789 123 456'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'new': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'waiting': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock3 className="w-4 h-4 text-yellow-500" />;
      case 'low': return <TrendingUp className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-gray-900">iiko Support Panel</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveSection('tasks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'tasks' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ListTodo className="w-5 h-5" />
            <span>Все задачи</span>
            <Badge variant="secondary" className="ml-auto">24</Badge>
          </button>
          
          <button
            onClick={() => setActiveSection('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'history' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>История решений</span>
          </button>
          
          <button
            onClick={() => setActiveSection('docs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'docs' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Документация</span>
          </button>
          
          <button
            onClick={() => setActiveSection('tools')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'tools' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Полезные инструменты</span>
          </button>
          
          <button
            onClick={() => setActiveSection('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'profile' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Профиль / KPI</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white">💡</span>
                </div>
                <div>
                  <p className="text-sm text-blue-900 mb-1">Совет дня</p>
                  <p className="text-xs text-blue-700">Используйте горячие клавиши для быстрого доступа</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Поиск по задачам, клиентам, ID..." 
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <Avatar>
                <AvatarFallback>ИП</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-gray-900">Иван Петров</p>
                <p className="text-xs text-gray-500">Старший инженер</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 mb-1">Все задачи</h2>
                <p className="text-sm text-gray-500">Управление обращениями клиентов</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="new">Новые</SelectItem>
                    <SelectItem value="in-progress">В работе</SelectItem>
                    <SelectItem value="waiting">Ожидание</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все приоритеты</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="low">Низкий</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Фильтры
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(task.priority)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm text-gray-500">{task.id}</span>
                              <Badge className={getStatusColor(task.status)}>
                                {getStatusLabel(task.status)}
                              </Badge>
                            </div>
                            <h3 className="text-gray-900 mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.client}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-2">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-xs">3</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Monitor className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            <span>{task.assignee}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{task.date}</span>
                          </div>
                          
                          <Badge variant="outline" className="text-xs">
                            {task.type}
                          </Badge>
                          
                          <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
                            <Monitor className="w-4 h-4" />
                            <span className="font-mono">{task.anydeskId}</span>
                          </div>
                          
                          <Button variant="outline" size="sm" className="gap-2">
                            Открыть
                            <ChevronRight className="w-4 h-4" />
                          </Button>
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

      {/* Right Sidebar - AI Panel */}
      <aside className="w-80 bg-white border-l border-gray-200 overflow-auto">
        <div className="p-6">
          <h3 className="text-gray-900 mb-4">Помощник</h3>
          
          <Card className="mb-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-sm text-blue-900">💡 Совет от нейросети</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-800 mb-3">
                Задача TK-4521 похожа на случай из прошлой недели. Проверьте подключение к серверу и версию плагина синхронизации.
              </p>
              <Button variant="outline" size="sm" className="w-full gap-2">
                Посмотреть похожие кейсы
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Закрыть задачу
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <MessageSquare className="w-4 h-4" />
                Написать клиенту
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Monitor className="w-4 h-4" />
                Подключиться (AnyDesk)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Заметки</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full min-h-32 p-3 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Добавьте заметки по задаче..."
              />
              <Button size="sm" className="w-full mt-2">
                Сохранить
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Статистика за сегодня</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Закрыто задач</span>
                <span className="font-mono text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">В работе</span>
                <span className="font-mono text-blue-600">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Среднее время</span>
                <span className="font-mono text-gray-900">42 мин</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
