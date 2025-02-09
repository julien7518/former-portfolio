import { IconType } from "react-icons";

import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
  HiChevronDown,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiArrowRight,
  HiOutlineEnvelope,
} from "react-icons/hi2";

import {
  TbLabelImportant
} from "react-icons/tb";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
} from "react-icons/pi";

import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaXTwitter
} from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  chevronRight: HiChevronRight,
  chevronLeft: HiChevronLeft,
  ChevronUp: HiChevronUp,
  chevronDown: HiChevronDown,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  outlineEmail: HiOutlineEnvelope,
  subject: TbLabelImportant,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  home: PiHouseDuotone,
  discord: FaDiscord,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
};