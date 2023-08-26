import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { FaPrint } from "react-icons/fa";

/**
 * SocialShareButtons Component.
 *
 * This component provides social share buttons for Facebook, Twitter,
 * WhatsApp, and Email. It also includes a print button to print the current
 * page. It uses the react-share library for social sharing functionality.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.recipeName - The name of the recipe being shared.
 * @param {Object} props.location - The location object from React Router, to extract the pathname.
 *
 * @returns {JSX.Element} - The SocialShareButtons component.
 */
function SocialShareButtons({ recipeName, location }) {
  // Prepare the title and URL to share
  const title = `Check out this recipe ${recipeName} for on Scran!`;
  const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;

  return (
    <div className="flex gap-2">
      {/* Facebook share button */}
      <FacebookShareButton url={fullUrl} quote={title} className="button-class">
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      {/* Twitter share button */}
      <TwitterShareButton url={fullUrl} title={title} className="button-class">
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      {/* Whatsapp share button */}
      <WhatsappShareButton
        url={fullUrl}
        title={title}
        separator=" "
        className="button-class"
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      {/* Email share button */}
      <EmailShareButton
        url={fullUrl}
        subject={title}
        body="Check out this Scran recipe!"
        className="button-class"
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>

      {/* Print button */}
      <button
        onClick={() => window.print()}
        className="button-class"
        data-testid="printButton"
      >
        <FaPrint size={32} />
      </button>
    </div>
  );
}

export default SocialShareButtons;
