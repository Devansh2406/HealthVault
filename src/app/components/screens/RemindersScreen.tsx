import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, HelpCircle, Check, Droplet, Heart, User, Info, Calendar, Pill } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/ui/drawer';
import { BottomNav } from '@/app/components/BottomNav';
import { useApp } from '@/app/context/AppContext';

// Helper to map type to image
const getTypeConfig = (type: string) => {
  switch (type) {
    case 'sugar':
      return {
        icon: Droplet,
        iconColor: 'text-red-500',
        color: 'green',
        image: '/assets/glucometer_device_1768365538282.png'
      };
    case 'bp':
      return {
        icon: Heart,
        iconColor: 'text-blue-500',
        color: 'blue',
        image: '/assets/bp_monitor_device_1768365553913.png'
      };
    case 'lipid':
      return {
        icon: Calendar,
        iconColor: 'text-orange-500',
        color: 'orange',
        image: '/assets/blood_test_tubes_1768365566768.png'
      };
    case 'medicine':
      return {
        icon: Pill,
        iconColor: 'text-purple-500',
        color: 'purple',
        image: '/assets/blood_test_tubes_1768365566768.png' // Utilizing existing asset as placeholder
      };
    default:
      return {
        icon: Calendar,
        iconColor: 'text-gray-500',
        color: 'gray',
        image: '/assets/blood_test_tubes_1768365566768.png'
      };
  }
};

export function RemindersScreen() {
  const navigate = useNavigate();
  const { reminders, toggleReminder, addReminder } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // New reminder form state
  const [newReminder, setNewReminder] = useState({
    testName: '',
    frequency: '',
    nextDueDate: '',
    type: 'sugar' as 'sugar' | 'bp' | 'lipid' | 'medicine' | 'other'
  });

  const handleAddReminder = () => {
    if (!newReminder.testName || !newReminder.nextDueDate) return;

    // Format date nicely
    const dateObj = new Date(newReminder.nextDueDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

    addReminder({
      id: Date.now().toString(),
      testName: newReminder.testName,
      frequency: newReminder.type === 'medicine' ? newReminder.frequency : 'One-time',
      nextDueDate: formattedDate,
      type: newReminder.type,
      enabled: true
    });

    setIsOpen(false);
    // Reset form
    setNewReminder({
      testName: '',
      frequency: '',
      nextDueDate: '',
      type: 'sugar'
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-[#F8FAFC]">
        <div className="bg-[#E8F5E9] p-3 rounded-full">
          <User className="w-6 h-6 text-[#2D3748]" />
        </div>
        <h1 className="text-xl font-bold text-[#1A202C]">Health Reminders</h1>
        <div className="bg-[#E8F5E9] p-2 rounded-full">
          <HelpCircle className="w-6 h-6 text-[#2D3748]" />
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Today's Status Card */}
        <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-[#E8F5E9] p-2 rounded-full">
              <div className="bg-[#10C469] p-1 rounded-full text-white">
                <Check className="w-4 h-4" strokeWidth={4} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#1A202C] text-md">Today's Status</h3>
              <p className="text-gray-500 text-sm">All tests are up to date for today.</p>
            </div>
          </CardContent>
        </Card>

        {/* Active Schedules Header */}
        <div>
          <h2 className="text-xl font-bold text-[#1A202C] mb-4">Active Schedules</h2>

          <div className="space-y-4">
            {reminders.map((reminder) => {
              const config = getTypeConfig(reminder.type);
              const Icon = config.icon;

              return (
                <Card key={reminder.id} className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${config.iconColor} fill-current`} />
                        <span className={`text-[${reminder.enabled ? '#10C469' : '#F6AD55'}] text-sm font-medium`}>
                          {reminder.frequency}
                        </span>
                      </div>

                      <h3 className="font-bold text-[#1A202C] text-lg leading-tight w-3/4 mb-1">
                        {reminder.testName}
                      </h3>

                      <p className={`text-sm ${reminder.enabled ? 'text-[#10C469]' : 'text-orange-500'} font-medium`}>
                        Next Due: {reminder.nextDueDate}
                      </p>

                      <div className="mt-4">
                        <Button
                          onClick={() => toggleReminder(reminder.id)}
                          className={`h-10 rounded-full px-6 text-sm font-medium flex items-center gap-2 transition-all duration-300 ${reminder.enabled
                            ? 'bg-[#10C469] hover:bg-[#0da056] text-white shadow-[#10C469]/30 shadow-lg'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                            }`}
                        >
                          {reminder.enabled ? 'Remind Me' : 'Paused'}
                          <div className={`w-8 h-4 rounded-full p-0.5 flex transition-all duration-300 ${reminder.enabled ? 'bg-black/20 justify-end' : 'bg-gray-400 justify-start'
                            }`}>
                            <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Device Image */}
                    <div className="w-28 h-28 bg-gray-50 rounded-2xl p-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={config.image}
                        alt={reminder.testName}
                        className="w-full h-full object-contain mix-blend-multiply"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/100x100?text=Device";
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Health Guideline Tip */}
        <div className="bg-[#E8F5E9] rounded-2xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#10C469] rounded-full p-1">
                <Info className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-[#1A202C]">Health Guideline Tip</h3>
            </div>
            <p className="text-[#2D3748] text-sm leading-relaxed">
              According to Indian health standards, regular sugar testing helps in early detection of glycemic fluctuations which is vital for long-term health management.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button with Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div className="fixed bottom-24 right-6 z-50">
            <Button
              className="w-16 h-16 rounded-full bg-[#10C469] hover:bg-[#0da056] shadow-lg shadow-[#10C469]/40 flex items-center justify-center p-0"
            >
              <Plus className="w-8 h-8 text-white" />
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-2xl font-bold text-center">Add New Reminder</DrawerTitle>
              <DrawerDescription className="text-center">Set up a new health check schedule</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as any })}
                >
                  <option value="sugar">Sugar Test</option>
                  <option value="bp">Blood Pressure</option>
                  <option value="lipid">Lipid Profile</option>
                  <option value="medicine">Medicine</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{newReminder.type === 'medicine' ? 'Medicine Name' : 'Test Name'}</Label>
                <Input
                  id="name"
                  placeholder={newReminder.type === 'medicine' ? "e.g. Metformin" : "e.g. Thyroid Check"}
                  value={newReminder.testName}
                  onChange={(e) => setNewReminder({ ...newReminder, testName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Next Due Date</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={newReminder.nextDueDate}
                  onChange={(e) => setNewReminder({ ...newReminder, nextDueDate: e.target.value })}
                />
              </div>

              {newReminder.type === 'medicine' && (
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <select
                    id="frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newReminder.frequency}
                    onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                  >
                    <option value="" disabled>Select Frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Twice Daily">Twice Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="As Needed">As Needed</option>
                  </select>
                </div>
              )}
            </div>
            <DrawerFooter>
              <Button onClick={handleAddReminder} className="bg-[#10C469] hover:bg-[#0da056] text-white">Save Reminder</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <BottomNav />
    </div>
  );
}
