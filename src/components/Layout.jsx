import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'All Posts' },
  { to: '/add', label: 'Add New' },
  { to: '/preview', label: 'Preview' },
];

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-background shrink-0">
        <div className="p-4">
          <h1 className="text-lg font-semibold text-foreground mb-6">Dashboard</h1>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-secondary text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-background p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;