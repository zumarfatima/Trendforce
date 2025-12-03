export interface ServiceCard {
  src: string;
  heading: string;
  subheading: string;
}

export interface MainHeadingProps {
  button?: React.ReactNode;
  center?: boolean;
  heading1: string;
  heading2: string;
  subheading?: string;
  textWhite?: boolean;
}

export interface MainCardProps{
  src: string;
  heading: string;
  subheading: string;
}

export interface ServicesSectionProps {
  servicesSection: {
    servicesButton: string;
    heading1: string;
    heading2: string;
    subheading: string;
  };
  mainCards: ServiceCard[];
}
export interface aboutUsCardProps {
  heading: string;
  src: string;
  subheading?: string;
}

export interface AdvantageCard {
  title: string;
  description: string;
}