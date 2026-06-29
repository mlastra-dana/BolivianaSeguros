import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import AppLayout from './components/AppLayout.jsx';
import { brokers, groups as initialGroups, membersByGroup as initialMembers } from './data/mockData.js';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import GroupsPage from './pages/GroupsPage.jsx';
import GroupDetailPage from './pages/GroupDetailPage.jsx';
import PublicAffiliationPage from './pages/PublicAffiliationPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

export default function App() {
  const [isAuthenticated, setAuthenticated] = useState(() => localStorage.getItem('lbc-demo-auth') === 'true');
  const [groups, setGroups] = useState(initialGroups);
  const [membersByGroup, setMembersByGroup] = useState(initialMembers);
  const navigate = useNavigate();

  const data = useMemo(() => ({ groups, brokers, membersByGroup }), [groups, membersByGroup]);

  const handleLogin = () => {
    localStorage.setItem('lbc-demo-auth', 'true');
    setAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('lbc-demo-auth');
    setAuthenticated(false);
    navigate('/login');
  };

  const addGroup = (group) => {
    setGroups((current) => [group, ...current]);
    setMembersByGroup((current) => ({ ...current, [group.id]: [] }));
  };

  const addMember = (groupId, member) => {
    setMembersByGroup((current) => ({ ...current, [groupId]: [member, ...(current[groupId] || [])] }));
    setGroups((current) =>
      current.map((group) => (group.id === groupId ? { ...group, memberCount: group.memberCount + 1, monthAffiliations: group.monthAffiliations + 1 } : group)),
    );
  };

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/affiliation/:groupSlug" element={<PublicAffiliationPage groups={groups} />} />
      <Route element={isAuthenticated ? <AppLayout onLogout={handleLogout} /> : <Navigate to="/login" replace />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage data={data} />} />
        <Route path="/groups" element={<GroupsPage data={data} onAddGroup={addGroup} />} />
        <Route path="/groups/:groupId" element={<GroupDetailPage data={data} onAddMember={addMember} />} />
        <Route path="/reports" element={<ReportsPage data={data} />} />
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}
