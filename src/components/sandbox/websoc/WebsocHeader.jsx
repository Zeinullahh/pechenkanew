"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  Palette,
  Languages,
  Settings2,
  DollarSign,
  Tag,
  CreditCard,
  Trash2,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { timeZones, getGMTOffsetString } from "@/lib/timezones";

/* =========================================================================
   1. ThemeSelector — 1:1 match of websoc/CMC/src/components/custom/theme_selector.jsx
   ========================================================================= */
function ThemeSelector({ themeName, setThemeName }) {
  return (
    <Select value={themeName} onValueChange={setThemeName}>
      <SelectTrigger className="w-48 text-center bg-zinc-100 text-black font-bold border px-8 rounded-full">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
        <SelectItem value="primary">Primary</SelectItem>
        <SelectItem value="aurora">Aurora</SelectItem>
        <SelectItem value="blue">Blue</SelectItem>
        <SelectItem value="emerald">Emerald</SelectItem>
      </SelectContent>
    </Select>
  );
}

/* =========================================================================
   2. LanguageSwitcher — 1:1 match of websoc/CMC/src/components/LanguageSwitcher.jsx
   ========================================================================= */
const languages = [
  { code: "ru", name: "Русский", nativeName: "Русский", countryCode: "RU" },
  { code: "en", name: "English", nativeName: "English", countryCode: "US" },
  { code: "kk", name: "Қазақша", nativeName: "Қазақша", countryCode: "KZ" },
  { code: "ko", name: "Korean", nativeName: "한국어", countryCode: "KR" },
  { code: "zh", name: "Chinese", nativeName: "中文", countryCode: "CN" },
];

function LanguageSwitcher() {
  const [locale, setLocale] = useState("en");

  return (
    <Select value={locale} onValueChange={setLocale}>
      <SelectTrigger className="w-48 text-center bg-zinc-100 text-black font-bold border px-8 rounded-full">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <img
                src={`/flags/${lang.countryCode.toLowerCase()}.svg`}
                alt={lang.name}
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span>{lang.nativeName}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* =========================================================================
   3. TimeZoneSelector — 1:1 match of websoc/CMC/src/components/custom/timezone_selector.jsx
   ========================================================================= */
function TimeZoneSelector() {
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [currentTime, setCurrentTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: selectedTimeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setCurrentTime(timeStr);
      } catch {
        setCurrentTime("--:--:--");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedTimeZone]);

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedTimeZone} onValueChange={setSelectedTimeZone}>
        <SelectTrigger className="w-48 text-center h-8 bg-zinc-100 text-black font-bold border px-8 rounded-full text-sm">
          <SelectValue>
            {timeZones.find((tz) => tz.value === selectedTimeZone)?.label || selectedTimeZone}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-200 max-h-64">
          {timeZones.map((tz) => (
            <SelectItem key={tz.value} value={tz.value} className="hover:bg-zinc-800 focus:bg-zinc-800">
              {tz.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-col items-end">
        <span className="text-xs text-zinc-400 font-mono">
          {getGMTOffsetString(selectedTimeZone)}
        </span>
        <span className="text-xs font-mono text-zinc-300">
          {currentTime}
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   4. PaymentHistory — 1:1 match of websoc/CMC/src/components/custom/payment_history.jsx
   ========================================================================= */
function PaymentHistory({ payments = [] }) {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "succeeded":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-48 text-center bg-zinc-100 text-black font-bold border px-8 rounded-full">
          Payment History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Payment History</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-zinc-300">Status</TableHead>
                  <TableHead className="text-zinc-300">Description</TableHead>
                  <TableHead className="text-zinc-300">Date</TableHead>
                  <TableHead className="text-zinc-300 text-right">Amount</TableHead>
                  <TableHead className="text-zinc-300 text-right">Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-zinc-800/50 transition">
                    <TableCell className="flex items-center gap-2 text-sm">
                      {getStatusIcon(payment.status)}
                      <span className="font-medium text-green-400">
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-300 text-sm">
                      {payment.description || "Wallet top-up"}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-xs">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {payment.date || payment.createdAt}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-400">
                      {typeof payment.amount === "number" ? `$${payment.amount.toFixed(2)}` : payment.amount}
                    </TableCell>
                    <TableCell className="text-right text-zinc-500 text-xs font-mono">
                      {payment.id}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================================
   5. PromocodeSettings — 1:1 match of websoc/CMC/src/components/custom/promocode_settings.jsx
   ========================================================================= */
function PromocodeSettings() {
  const [promocodeValue, setPromocodeValue] = useState("");
  const [lockedPromocode, setLockedPromocode] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSave = () => {
    const code = String(promocodeValue || "").trim();
    if (!code) return;

    setSaving(true);
    setTimeout(() => {
      setLockedPromocode(code.toUpperCase());
      setSuccess("Promocode successfully applied to account");
      setSaving(false);
    }, 500);
  };

  return (
    <div className="p-6 grid grid-cols-4 items-start gap-4 border-t border-zinc-700/50">
      <div className="flex gap-x-2 pt-2">
        <Tag />
        <div>
          <h4>Promocode</h4>
          <p className="text-xs text-white/60">Enter an affiliate promo code to receive a discount</p>
        </div>
      </div>

      <div className="col-span-3 flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Input
            value={lockedPromocode || promocodeValue}
            onChange={(event) => setPromocodeValue(event.target.value)}
            placeholder="PROMOCODE"
            disabled={Boolean(lockedPromocode) || saving}
            className="max-w-md bg-zinc-100 text-black font-bold border px-4 rounded-full"
          />
          <Button
            type="button"
            onClick={handleSave}
            disabled={Boolean(lockedPromocode) || saving}
            className="rounded-full bg-white text-black hover:bg-zinc-200"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : lockedPromocode ? (
              "Promocode applied"
            ) : (
              "Apply"
            )}
          </Button>
        </div>

        <p className="text-xs text-white/60">
          {lockedPromocode
            ? "A promocode has already been linked to this account."
            : "Once applied, the promocode is permanently linked to your profile."}
        </p>

        {success ? <p className="text-xs text-emerald-300">{success}</p> : null}
      </div>
    </div>
  );
}

/* =========================================================================
   6. PaymentForm (Paddle checkout) — 1:1 match of websoc/CMC/src/components/custom/payment_form.jsx
   ========================================================================= */
function PaymentForm({ dispatch }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const predefinedAmounts = [10, 25, 50, 100];

  const handlePredefinedClick = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    const val = parseFloat(e.target.value);
    setCustomAmount(e.target.value);
    if (!isNaN(val) && val > 0) {
      setAmount(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      dispatch?.({ type: "WEBSOC_TOPUP", amount });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <CreditCard className="mr-2 h-4 w-4" />
          Top Up Balance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Top Up Balance</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label>Select amount ($ USD)</Label>
            <div className="grid grid-cols-4 gap-2">
              {predefinedAmounts.map((val) => (
                <Button
                  key={val}
                  type="button"
                  variant={amount === val && !customAmount ? "default" : "outline"}
                  className={`border-zinc-700 ${
                    amount === val && !customAmount
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                  onClick={() => handlePredefinedClick(val)}
                >
                  ${val}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-amount">Or enter custom amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
              <Input
                id="custom-amount"
                type="number"
                min="5"
                max="10000"
                step="1"
                placeholder="50"
                className="pl-8 bg-zinc-800 border-zinc-700 text-white"
                value={customAmount}
                onChange={handleCustomChange}
              />
            </div>
          </div>

          <div className="p-3 bg-zinc-800/50 rounded-lg text-xs text-zinc-400 space-y-1">
            <div className="flex justify-between">
              <span>Payment Gateway:</span>
              <span className="text-zinc-200 font-medium">Paddle Checkout</span>
            </div>
            <div className="flex justify-between">
              <span>Deposit Amount:</span>
              <span className="text-green-400 font-bold">${amount.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Proceed to Checkout
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================================
   7. Navbar — 1:1 match of websoc/CMC/src/components/Navbar.jsx
   ========================================================================= */
function Navbar() {
  return (
    <div className="flex justify-center items-center w-full">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`}
            >
              <a href="https://silence.codes/en/instructions/ai-soc/" target="_blank" rel="noopener noreferrer">
                Instructions
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`}
            >
              <a href="https://web-soc.silenceai.net/" target="_blank" rel="noopener noreferrer">
                Web Security
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`}
            >
              <a href="https://email-soc.silenceai.net/" target="_blank" rel="noopener noreferrer">
                Email Security
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

/* =========================================================================
   8. UserProfileMenu — 1:1 match of websoc/CMC/src/components/UserProfileMenu.jsx
   ========================================================================= */
function UserProfileMenu({ state, dispatch }) {
  const websoc = state.websoc;
  const balance = websoc?.userBalance || 1250.0;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback className="text-zinc-900 bg-gradient-to-tr from-cyan-400 to-fuchsia-400 font-bold">
              U
            </AvatarFallback>
          </Avatar>
          <div className="text-start">
            <h3 className="text-md font-medium text-zinc-100">
              admin@silenceai.net
            </h3>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-zinc-900 text-white border border-zinc-700"
      >
        {/* Balance Display */}
        <div className="px-3 py-2 border-b border-zinc-700">
          <p className="text-sm text-zinc-400">Balance</p>
          <p className="text-lg font-semibold text-green-400">
            ${balance.toFixed(2)}
          </p>
        </div>

        <DropdownMenuSeparator className="bg-zinc-700" />

        {/* Top-up via Paddle */}
        <div className="p-2">
          <PaymentForm dispatch={dispatch} />
        </div>

        <DropdownMenuSeparator className="bg-zinc-700" />

        <DropdownMenuLabel className="text-white">Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-700" />
        <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
          Change password
        </DropdownMenuItem>

        {/* Delete Account with Alert Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="hover:bg-zinc-800 text-red-400 focus:text-red-400 cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  dispatch({
                    type: "TOAST",
                    toast: {
                      title: "Account deleted",
                      detail: "Account and API keys revoked.",
                      type: "success",
                    },
                  });
                }}
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenuItem
          className="hover:bg-zinc-800 cursor-pointer"
          onClick={() => {
            dispatch({
              type: "TOAST",
              toast: {
                title: "Signed out",
                detail: "Signed out of demonstration console.",
                type: "success",
              },
            });
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* =========================================================================
   9. Main WebsocHeader Component
   Structure strictly per:
   absolute top-0 left-0 flex justify-center bg-transparent text-white z-20 w-full
   ========================================================================= */
export default function WebsocHeader({ state, dispatch }) {
  const websoc = state.websoc;
  const currentTheme = websoc?.theme || "primary";

  return (
    <div className="absolute top-0 left-0 flex justify-center bg-transparent text-white z-20 w-full pointer-events-auto">
      <div className="w-full px-6">
        <div className="flex justify-between items-center py-4">
          <div className="w-1/8 flex gap-x-4 items-center">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="p-1 rounded text-white hover:bg-white/10 transition-colors focus:outline-none"
                  title="Menu"
                >
                  <Menu size={32} color="white" />
                </button>
              </DialogTrigger>
              <DialogContent
                align="start"
                className="w-2/3 h-[80%] p-0 m-0 g-0 border-zinc-600 bg-transparent text-white backdrop-blur-sm justify-normal top-10 translate-y-0 flex flex-col overflow-y-auto"
              >
                <DialogTitle className="sr-only">Console Preferences</DialogTitle>
                <div className="p-6 grid grid-cols-4 items-center">
                  <div className="flex gap-x-2 items-center">
                    <Palette />
                    <h4>Globe style</h4>
                  </div>
                  <ThemeSelector
                    themeName={currentTheme}
                    setThemeName={(theme) => dispatch({ type: "WEBSOC_THEME", theme })}
                  />
                </div>

                <div className="p-6 grid grid-cols-4 items-center">
                  <div className="flex gap-x-2 items-center">
                    <Languages />
                    <h4>Select language</h4>
                  </div>
                  <LanguageSwitcher />
                </div>

                <div className="p-6 grid grid-cols-4 items-center">
                  <div className="flex gap-x-2 items-center">
                    <Settings2 />
                    <h4>Time zone</h4>
                  </div>
                  <TimeZoneSelector />
                </div>

                <div className="p-6 grid grid-cols-4 items-center">
                  <div className="flex gap-x-2 items-center">
                    <DollarSign />
                    <h4>Payment History</h4>
                  </div>
                  <PaymentHistory payments={websoc?.paymentHistory || []} />
                </div>

                <PromocodeSettings />
              </DialogContent>
            </Dialog>
          </div>

          <Navbar />
          <UserProfileMenu state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}
