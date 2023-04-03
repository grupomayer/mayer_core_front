import styles from "./side_menu.module.scss";
import { SideMenuButton } from "./utils/classes";
import SideMenuButtonComponent from "./SideMenuButton/side_menu_button";
import { useState } from "react";
import classNames from "classnames";
import { SelectDataClass } from "Utils/classes";
import logo from "Images/logo_mayer.png"
import userIcon from "Images/user.png"

function SideMenu() {

  const [openMenu, setOpenMenu] = useState<boolean>(true);
  const [options, setOptions] = useState<Array<SideMenuButton>>([
    new SideMenuButton("Usuários", [
      new SelectDataClass("users", "Buscar usuários"),
      new SelectDataClass("register_user", "Cadastrar usuário"),
    ], userIcon, true),
    new SideMenuButton("Prestadores", [
      new SelectDataClass("users", "Transferir serviços")
    ], userIcon)
  ]);

  function changeTab(button: SideMenuButton) {
    setOptions(options.map(option => {
      const curButton = option;
      curButton.setSelected(curButton.name === button.name);
      return curButton;
    }))
  }

  return (<>
    <section className={classNames({
      [styles.menu]: true,
      [styles["menu--closed"]]: !openMenu
    })}>
      <div className={styles.center}>
        <button
          className={styles.menu__button}
          onClick={() => setOpenMenu(!openMenu)}
        >=</button>
      </div>
      {openMenu && (
        <figure className={styles.center}>
          <img
            alt="Logo do Grupo Mayer"
            src={logo}
            className={styles.mayer}
          />
        </figure>
      )}
      {openMenu && (<>
        {options.map(button => (
          <SideMenuButtonComponent
            key={button.name}
            data={button}
            onClick={() => changeTab(button)}
          />
        ))}
      </>)}
    </section>
    <div className={classNames({
      [styles.out]: openMenu,
      [styles["out-small"]]: !openMenu
    })} />
  </>)
}

export default SideMenu;