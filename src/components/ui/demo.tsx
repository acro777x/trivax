import { LimelightNav, NavItem } from "@/components/ui/limelight-nav";
import { Home, Bookmark, PlusCircle, User, Settings } from 'lucide-react';

const customNavItems: NavItem[] = [
  { id: 'home', icon: <Home />, label: 'Home', onClick: () => console.log('Home Clicked!') },
  { id: 'bookmark', icon: <Bookmark />, label: 'Bookmarks', onClick: () => console.log('Bookmark Clicked!') },
  { id: 'add', icon: <PlusCircle />, label: 'Add New', onClick: () => console.log('Add Clicked!') },
  { id: 'profile', icon: <User />, label: 'Profile', onClick: () => console.log('Profile Clicked!') },
  { id: 'settings', icon: <Settings />, label: 'Settings', onClick: () => console.log('Settings Clicked!') },
];

const Customized = () => {
  return <LimelightNav className="bg-secondary dark:bg-card/50 dark:border-accent/50 rounded-xl" items={customNavItems} />;
};

export { Customized };

const Default = () => {
  return <LimelightNav />;
};

export { Default };
export default Customized;
