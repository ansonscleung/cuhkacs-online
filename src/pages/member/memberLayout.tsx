import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Navbar } from "react-bulma-components";
import { Link, Outlet, Navigate } from "react-router-dom";
import { appName } from "utils/const";
import useUserStatus from "utils/useUserStatus";
import { useSetIcon, useSignOutCallback } from "utils/miscHooks";
import cuhkacsIcon from "static/cuhkacs.ico";

const MemberLayout: React.FunctionComponent = () => {
  const userStatus = useUserStatus();
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setActive] = useState(false);

  const toggleActive = useCallback(() => {
    setActive(!isActive);
  }, [isActive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navBarRef?.current?.contains(event.target as Node) === false) {
        setActive(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [navBarRef]);

  const signOutCallback = useSignOutCallback();

  useSetIcon(cuhkacsIcon);

  if (!userStatus) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div ref={navBarRef}>
        <Navbar
          color="warning"
          fixed="top"
          active={isActive}
          onClick={() => {
            if (isActive) setActive(false);
          }}
        >
          <Navbar.Brand>
            <Link to="/member" className="navbar-item">
              {appName}
            </Link>
            <Navbar.Burger
              onClick={toggleActive}
              onKeyPress={(event: React.KeyboardEvent) =>
                ["Enter", " "].includes(event.key) && toggleActive()
              }
              aria-label="Menu"
              renderAs="a"
            />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Container align="right">
              <Button
                color="danger"
                className="is-align-self-center"
                onClick={signOutCallback}
              >
                Logout
              </Button>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
      </div>
      <div className="px-4 py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
