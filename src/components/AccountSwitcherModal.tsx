import React from 'react';
import { 
  X, 
  CheckCircle2, 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  Users,
  Shield,
  Ship,
  UserX,
  Lock
} from 'lucide-react';
import { AppUser } from '../types/tour';
import { OFFICIAL_HANDBOOK_ROLES } from '../data/mockUsers';

interface AccountSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AppUser | null;
  onSelectUser: (user: AppUser | null) => void;
}

export const AccountSwitcherModal: React.FC<AccountSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  Phân Quyền &amp; Tài Khoản Sổ Tay
                </h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  CSE703073
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                4 vai trò chuẩn quy định trong Sổ tay thực hành Đề tài ĐT-13
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Account Bar */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="text-slate-500">Đang hoạt động:</span>
            {currentUser ? (
              <>
                <strong className="text-[#0088cc] dark:text-blue-400 font-bold">{currentUser.name}</strong>
                <span className="text-slate-400">({currentUser.roleTitle})</span>
              </>
            ) : (
              <strong className="text-amber-600 dark:text-amber-400 font-bold">Khách Vãng Lai (Chưa đăng nhập)</strong>
            )}
          </div>
          
          {currentUser && (
            <button
              type="button"
              onClick={() => {
                onSelectUser(null);
                onClose();
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <UserX className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          )}
        </div>

        {/* 4 Official Handbook Roles List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {OFFICIAL_HANDBOOK_ROLES.map((user, idx) => {
            const isCurrent = currentUser?.id === user.id;

            return (
              <div
                key={user.id}
                onClick={() => {
                  onSelectUser(user);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 group ${
                  isCurrent
                    ? 'border-[#0088cc] bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-[#0088cc]/30 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/50 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl ${user.avatarBg} text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 group-hover:scale-105 transition-transform`}>
                    {user.avatarText}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                        {user.name}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${user.tierColor}`}>
                        {user.tierBadge}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {user.roleTitle}
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
                      {user.description}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400 font-mono">
                      <span>Email: {user.email}</span>
                      <span>•</span>
                      <span>Mật khẩu: {user.password || '123456'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                  {isCurrent ? (
                    <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đang chọn</span>
                    </span>
                  ) : (
                    <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-[#0088cc] group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            Hệ thống phân quyền RBAC theo chuẩn Sổ tay môn học
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
