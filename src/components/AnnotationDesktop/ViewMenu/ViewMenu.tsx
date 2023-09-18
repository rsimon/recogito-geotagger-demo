import { useState } from 'react';
import { Chats, MagnifyingGlass, StackSimple, X } from '@phosphor-icons/react';
import { useTransition, animated } from '@react-spring/web'
import { Avatar } from '@components/Avatar';
import { isMe } from '@annotorious/react';
import type { Annotation, Formatter, PresentUser } from '@annotorious/react';
import type { Layer, Policies, Translations } from 'src/Types';
import { LayersPanel } from '../LayersPanel';
import { AnnotationList } from '../AnnotationList';
import { ViewMenuPanel } from './ViewMenuPanel';

import './ViewMenu.css';

interface ViewMenuProps {

  i18n: Translations;

  present: PresentUser[];

  policies?: Policies;

  layers?: Layer[];

  sorting?: ((a: Annotation, b: Annotation) => number);

  onChangePanel(panel: ViewMenuPanel | undefined): void;

  beforeSelectAnnotation(a?: Annotation): void;

  onChangeFormatter(formatter?: Formatter): void;

}

export const ViewMenu = (props: ViewMenuProps) => {

  const me = props.present.find(isMe);

  const [panel, _setPanel] = useState<ViewMenuPanel | undefined>();

  const headerTransition = useTransition([panel], {
    from: { opacity: 0, width: 0 },
    enter: { opacity: 1, width: 140 },
    leave: { opacity: 0, width: 0 }, 
    config: {
      duration: 125
    }
  });

  const panelTransition = useTransition([panel], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }, 
    config: {
      duration: 100
    }
  });

  const setPanel = (p: ViewMenuPanel | undefined) => {
    _setPanel(p);
    props.onChangePanel(p);
  }

  const togglePanel = (p: ViewMenuPanel) =>
    panel === p ? setPanel(undefined) : setPanel(p);

  return (
    <div 
      className="anno-sidebar-container"
      data-collapsed={panel ? undefined : 'true'}>
      <div 
        className="anno-menubar anno-desktop-overlay view-menu">
        <section>
          <button 
            className={panel === ViewMenuPanel.ANNOTATIONS ? 'active' : undefined}
            onClick={() => togglePanel(ViewMenuPanel.ANNOTATIONS)}>
            <Chats />
          </button>

          <button
            className={panel === ViewMenuPanel.LAYERS ? 'active' : undefined}
            onClick={() => togglePanel(ViewMenuPanel.LAYERS)}>
            <StackSimple />
          </button>

          {/* <button>
            <MagnifyingGlass />
          </button> */}
        </section>

        {me && (
          <section>
            <Avatar 
              id={me.id}
              name={me.appearance.label}
              color={me.appearance.color} 
              avatar={me.appearance.avatar} />
          </section>
        )}

        {headerTransition((style, panel) => panel && (
          <animated.section className="close" style={style }>
            <button onClick={() => setPanel(undefined)}>
              <X />
            </button>
          </animated.section>
        ))}
      </div>

      {panelTransition((style, panel) => panel && (
        <animated.aside style={style}>
          {panel === ViewMenuPanel.ANNOTATIONS ? (
            <AnnotationList 
              i18n={props.i18n}
              present={props.present} 
              policies={props.policies}
              sorting={props.sorting}
              beforeSelect={props.beforeSelectAnnotation} />
          ) : panel === ViewMenuPanel.LAYERS ? (
            <LayersPanel
              i18n={props.i18n}
              layers={props.layers}
              present={props.present}
              onChange={props.onChangeFormatter} />
          ) : undefined}
        </animated.aside>
      ))}
    </div>
  )

}