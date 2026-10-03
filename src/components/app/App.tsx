"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useApp, type ScreenId } from "@/lib/store";
import PhoneFrame from "./PhoneFrame";
import BottomNav from "./BottomNav";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Splash from "./screens/Splash";
import OtpVerify from "./screens/OtpVerify";
import BookingDetails from "./screens/BookingDetails";
import Home from "./screens/Home";
import StationSearch from "./screens/StationSearch";
import TrainList from "./screens/TrainList";
import Booking from "./screens/Booking";
import SeatSelection from "./screens/SeatSelection";
import Review from "./screens/Review";
import PaymentMethods from "./screens/PaymentMethods";
import PaymentSuccess from "./screens/PaymentSuccess";
import MyTicket from "./screens/MyTicket";
import RunningStatus from "./screens/RunningStatus";
import LiveTrains from "./screens/LiveTrains";
import LiveMap from "./screens/LiveMap";
import TrainRoute from "./screens/TrainRoute";
import Chat from "./screens/Chat";
import MyProfile from "./screens/MyProfile";
import Wallet from "./screens/Wallet";
import Transactions from "./screens/Transactions";
import AuthenticateUser from "./screens/AuthenticateUser";
import ChangePassword from "./screens/ChangePassword";
import ManagePayments from "./screens/ManagePayments";
import MasterList from "./screens/MasterList";
import Loyalty from "./screens/Loyalty";
import Bookings from "./screens/Bookings";
import Help from "./screens/Help";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";

const SCREENS: Record<ScreenId, React.ComponentType> = {
  splash: Splash,
  login: Login,
  signup: Signup,
  otp: OtpVerify,
  bookingdetails: BookingDetails,
  home: Home,
  stations: StationSearch,
  trains: TrainList,
  booking: Booking,
  seats: SeatSelection,
  review: Review,
  paymethods: PaymentMethods,
  success: PaymentSuccess,
  ticket: MyTicket,
  running: RunningStatus,
  livetrains: LiveTrains,
  livemap: LiveMap,
  route: TrainRoute,
  chat: Chat,
  myprofile: MyProfile,
  wallet: Wallet,
  transactions: Transactions,
  authuser: AuthenticateUser,
  changepw: ChangePassword,
  managepay: ManagePayments,
  masterlist: MasterList,
  loyalty: Loyalty,
  bookings: Bookings,
  help: Help,
  profile: Profile,
  editprofile: EditProfile,
};

const TAB_ROOTS = new Set<ScreenId>(["home", "bookings", "help", "profile"]);

const variants: Variants = {
  // Screens slide toward the RIGHT: forward nav brings the new screen in from
  // the left edge; the outgoing one parallax-shifts right underneath.
  enter: (dir: number) => ({ x: dir >= 0 ? "-100%" : "24%", opacity: dir >= 0 ? 1 : 0.6 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "24%" : "-100%", opacity: dir >= 0 ? 0.6 : 1 }),
};

export default function App() {
  const stack = useApp((s) => s.stack);
  const direction = useApp((s) => s.direction);
  const loggedIn = useApp((s) => s.loggedIn);
  const top = stack[stack.length - 1];
  const Screen = SCREENS[top] ?? Home;
  const showNav = loggedIn && stack.length === 1 && TAB_ROOTS.has(top);

  return (
    <PhoneFrame>
      <div className="relative h-full w-full overflow-hidden bg-white">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={`${top}-${stack.length}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.9 }}
            className="absolute inset-0 bg-white"
          >
            <Screen />
          </motion.div>
        </AnimatePresence>

        {/* Floating bottom nav — rendered ONCE at App level so it stays perfectly
            still across tab switches; only the white circle glides (layoutId). */}
        {showNav && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30"
          >
            <BottomNav />
          </motion.div>
        )}
      </div>
    </PhoneFrame>
  );
}
