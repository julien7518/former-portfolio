import { IconType } from "react-icons";

import {
  HiChevronLeft,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiArrowRight,
  HiOutlineEnvelope,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
} from "react-icons/pi";

import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  chevronLeft: HiChevronLeft,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  emptyEmail: HiOutlineEnvelope,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  home: PiHouseDuotone,
  discord: FaDiscord,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
};