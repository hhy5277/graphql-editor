import * as React from 'react';
import * as styles from '../style/UI';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Loading } from './Loading';
import { DeleteProject } from '../popups/DeleteProject';
import { FakerDeployed } from '../popups/FakerDeployed';
import { LoginToDoThis } from '../popups/LoginToDoThis';
import { LoadFromURL } from '../popups/LoadFromURL';
import { CreateNamespace } from '../popups/CreateNamespace';
import { OnBoarding } from '../popups/OnBoarding';
import { TopBarMain } from './TopBarMain';
import { TopBarNewProject } from './TopBarNewProject';
type MenuCategory = {
  active: boolean;
  click: () => void;
};

export type UIProps = {
  code: MenuCategory;
  projects: MenuCategory;
  examples: MenuCategory;
};
export class UI extends React.Component<UIProps> {
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <React.Fragment>
              {cloud.state.loadingStack.length > 0 && (
                <Loading
                  onDismiss={cloud.unStackAll}
                  text={cloud.state.loadingStack}
                  errors={cloud.state.errorStack}
                />
              )}
              {cloud.state.popup === 'onBoarding' && <OnBoarding />}
              {cloud.state.popup === 'createUser' && <CreateNamespace />}
              {cloud.state.popup === 'deleteProject' && <DeleteProject />}
              {cloud.state.popup === 'fakerDeployed' && <FakerDeployed />}
              {cloud.state.popup === 'loginToContinue' && <LoginToDoThis />}
              {cloud.state.popup === 'loadURL' && <LoadFromURL />}
              <div className={styles.UI}>
                {cloud.state.visibleMenu === 'projects' &&
                (cloud.state.category === 'new' || cloud.state.category === 'edit') ? (
                  <TopBarNewProject />
                ) : (
                  <TopBarMain
                    code={this.props.code}
                    projects={this.props.projects}
                    examples={this.props.examples}
                  />
                )}
                {this.props.children}
              </div>
            </React.Fragment>
          );
        }}
      </Subscribe>
    );
  }
}