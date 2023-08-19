import { Link } from "react-router-dom";
import { Logo } from "../../components";

function UserCard() {
  return (
    <div className="card bg-base-100 shadow-2xl aspect-[3/4] text-primary">
      <div className="card-body items-center justify-around">
        <div className="card-actions">
          <Logo className="w-52" />
        </div>
        <div className="card-actions">
          <h2 className="text-2xl">Welcome to Scran</h2>
        </div>
        <div className="card-actions">
          <p>If you want to create your own recipes then you need to either:</p>
        </div>
        <div className="card-actions">
          <div className="flex justify-between flex-row space-x-4">
            <Link to={`/sign-in`}>
              <button className="btn btn-primary btn-sm">Sign In</button>
            </Link>
            <Link to={`/sign-up`}>
              <button className="btn btn-primary btn-sm">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
