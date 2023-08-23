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

function SocialShareButtons({ recipeName, location }) {
  const title = `Check out this recipe ${recipeName} for on Scran!`;
  const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;
  console.log(fullUrl);

  return (
    <div className="flex gap-2">
      <FacebookShareButton url={fullUrl} quote={title} className="button-class">
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={fullUrl} title={title} className="button-class">
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton
        url={fullUrl}
        title={title}
        separator=" "
        className="button-class"
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      <EmailShareButton
        url={fullUrl}
        subject={title}
        body="Check out this Scran recipe!"
        className="button-class"
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
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
