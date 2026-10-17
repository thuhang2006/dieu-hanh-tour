import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  Shield,
  Star,
  Ship,
  UserX,
  KeyRound,
  Check
} from 'lucide-react';
import { AppUser } from '../types/tour';
import { OFFICIAL_HANDBOOK_ROLES, COURSE_HANDBOOK_USERS } from '../data/mockUsers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AppUser | null) => void;
  initialMode?: 'login' | 'register';
  currentUser: AppUser | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const trimmedEmail = loginEmail.trim().toLowerCase();
    if (!trimmedEmail) {
      setLoginError('Vui lòng nhập Email hoặc Tài khoản.');
      return;
    }

    // Match against official handbook users
    const found = COURSE_HANDBOOK_USERS.find(
      u => u.email.toLowerCase() === trimmedEmail || u.name.toLowerCase().includes(trimmedEmail)
    );

    if (found) {
      onLoginSuccess(found);
      onClose();
    } else {
      // Dynamic customer account
      const customUser: AppUser = {
        id: `usr-${Date.now()}`,
        name: trimmedEmail.split('@')[0].toUpperCase(),
        role: 'customer',
        roleTitle: 'Khách hàng thành viên',
        email: trimmedEmail,
        phone: '0988.888.888',
        avatarText: trimmedEmail.substring(0, 2).toUpperCase(),
        avatarBg: 'bg-[#0088cc]',
        tierBadge: '⭐ Thành Viên Mới',
        tierColor: 'bg-blue-50 text-[#0088cc] border-blue-200 dark:bg-blue-950 dark:text-blue-300',
        description: 'Tài khoản khách hàng đăng nhập tự do',
        handbookPurpose: 'Trải nghiệm tra cứu tour và đặt phòng trực tuyến',
        password: loginPassword || '123456'
      };
      onLoginSuccess(customUser);
      onClose();
    }
  };

  const handleSelectRole = (user: AppUser) => {
    setLoginEmail(user.email);
    setLoginPassword(user.password || '123456');
    onLoginSuccess(user);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Vui lòng điền đầy đủ các trường thông tin bắt buộc (*).');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    const newUser: AppUser = {
      id: `usr-reg-${Date.now()}`,
      name: regName.trim(),
      role: 'customer',
      roleTitle: 'Khách hàng thành viên',
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim() || '0912.000.111',
      avatarText: regName.trim().substring(0, 2).toUpperCase(),
      avatarBg: 'bg-emerald-600',
      tierBadge: '⭐ Thành Viên Mới (Thưởng 100 điểm)',
      tierColor: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
      description: 'Tài khoản khách hàng mới đăng ký theo quy trình Milestone 1 Buổi 5',
      handbookPurpose: 'Trải nghiệm tìm kiếm và đặt tour du lịch với tư cách khách hàng mới',
      password: regPassword
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0088cc]/10 dark:bg-[#0088cc]/20 text-[#0088cc] flex items-center justify-center flex-shrink-0">
              {activeTab === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  {activeTab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Khách Hàng Mới'}
                </h3>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  Sổ Tay CSE703073
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Xác thực phân quyền RBAC & Quản lý phiên theo đề tài ĐT-13
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setLoginError(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'login'
                ? 'bg-[#0088cc] text-white shadow-sm shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng Nhập</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setRegError(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'register'
                ? 'bg-[#0088cc] text-white shadow-sm shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Đăng Ký Mới</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-left">
          {activeTab === 'login' ? (
            <>
              {/* Form Đăng Nhập Chuẩn */}
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email / Tài khoản
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="thaytanh@phenikaa-uni.edu.vn hoặc thuha.admin@dulichso.vn"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Mật khẩu
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Mặc định: <code className="font-mono text-[#0088cc] dark:text-blue-400 font-bold">123456</code>
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Nhập mật khẩu (123456)"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                    <input type="checkbox" defaultChecked className="rounded text-[#0088cc] focus:ring-0" />
                    <span>Ghi nhớ phiên đăng nhập (JWT)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('thaytanh@phenikaa-uni.edu.vn');
                      setLoginPassword('123456');
                    }}
                    className="text-[#0088cc] dark:text-blue-400 hover:underline text-xs"
                  >
                    Điền tài khoản Thầy Tánh
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Đăng Nhập Ngay</span>
                </button>
              </form>

              {/* Section: 4 Vai Trò Chuẩn Sổ Tay */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>4 Tài Khoản Chuẩn Sổ Tay Của Thầy Giao (1-Click)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Đề tài ĐT-13
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {OFFICIAL_HANDBOOK_ROLES.map((user) => {
                    const isCurrent = currentUser?.id === user.id;

                    return (
                      <div
                        key={user.id}
                        onClick={() => handleSelectRole(user)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                          isCurrent
                            ? 'border-[#0088cc] bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-[#0088cc]/30 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className={`w-9 h-9 rounded-xl ${user.avatarBg} text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 group-hover:scale-105 transition-transform`}>
                            {user.avatarText}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                {user.name}
                              </span>
                              {isCurrent && (
                                <span className="text-[9px] bg-blue-600 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                                  Đang dùng
                                </span>
                              )}
                            </div>

                            <div className="text-[11px] font-semibold text-[#0088cc] dark:text-blue-400 truncate mt-0.5">
                              {user.roleTitle}
                            </div>

                            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                              {user.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                          <span className="font-mono text-slate-400 truncate max-w-[170px]">
                            {user.email}
                          </span>
                          <span className="font-bold text-[#0088cc] dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <span>Đăng nhập</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chế độ Khách vãng lai */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onLoginSuccess(null);
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-slate-400" />
                    <span>Duyệt với tư cách Khách Vãng Lai (Guest — Không cần đăng nhập)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </>
          ) : (
            /* Form Đăng Ký Khách Hàng */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {regError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
                  {regError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Họ và tên khách hàng *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Ví dụ: Hoàng Anh Quân"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Địa chỉ Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="quan.hoanganh@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Số điện thoại liên hệ
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0912.345.678"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mật khẩu *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Xác nhận mật khẩu *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Đăng Ký &amp; Đăng Nhập Tự Động</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-[11px]">Bảo mật Bcrypt &amp; JWT Token theo chuẩn ISO/IEC 27001</span>
          </div>

          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Phenikaa Uni • CSE703073
          </span>
        </div>
      </div>
    </div>
  );
};
