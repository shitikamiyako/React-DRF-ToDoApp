import React from "react";
import { Button  } from "react-bootstrap";
import { useHistory } from "react-router-dom";


const Nomatch = () => {
    const history = useHistory();
  return (
    <div>
      <div className="justify-content-center text-center mt-5 mb-3">
            <h3>404 Page Not Found...ページが見つかりません。</h3>
      </div>
        <div className="page-not-found-button">
          <Button variant="success" onClick={() => history.push(`/`)}>
            Go Back Top
          </Button>
        </div>
    </div>
  );
};

export default Nomatch
