import { useState } from 'react';
import { Toast, ToastContent, ToastProvider } from '@components/Toast';
import { InviteUser } from './InviteUser';
import { MembersTable } from './MembersTable';
import type { TeamMember } from './TeamMember';
import type { ExtendedProjectData, Invitation, ProjectGroup, Translations, UserProfile } from 'src/Types';

import './ManageUsers.css';

interface ManageUsersProps {

  i18n: Translations;

  project: ExtendedProjectData;

  invitations: Invitation[];

  me: UserProfile;

};

export const ManageUsers = (props: ManageUsersProps) => {

  const { t } = props.i18n;

  const [project, setProject] = useState(props.project);

  const [error, setError] = useState<ToastContent | null>(null);

  // const [selected, setSelected] = useState<string[]>([]);

  /*
  const handleToggleSelected = (id: string) => {
    if (selected.includes(id)) {
      setSelected((old) => old.filter((i) => i != id));
    }
    else setSelected((old) => [...old, id]);
  };

  const toggleSelectAll = () => {
    if (data && data.length == selected.length) {
      setSelected([]);
    }
    else setSelected(data ? data.map((i) => i.profiles.id) : []);
  };
  */

  const onChangeGroup = (member: TeamMember, from: ProjectGroup, to: ProjectGroup) => {
    // Update the member
    const updated = {
      ...member,
      inGroup: to
    };

    // Update project groups
    setProject(project => ({
      ...project,
      groups: project.groups.map(group => group.id === from.id ? (
        // Remove user from this group
        { ...group, members: group.members.filter(m => m.user.id !== member.user.id) }
      ) : group.id === to.id ? (
        // Add user to this group
        { ...group, members: [...group.members, updated ]}
      ) : group)
    }));
  }

  const onDeleteMember = (member: TeamMember) => {
    // Remove the user from this project
    setProject(project => ({
      ...project,
      groups: project.groups.map(group => ({
        ...group,
        members: group.members.filter(m => m.user.id !== member.user.id)
      }))
    }));
  }

  const onDeleteError = () => 
    setError({ 
      title: t['Something went wrong'], 
      description: t['Could not delete user.'], 
      type: 'error' 
    });

  const onInvitationSent = (email: string) => {

  }

  const onInvitationError = () => {

  }

  return (
    <div className="manage-users">
      <ToastProvider>
        <h1>Project Team</h1>

        <InviteUser 
          i18n={props.i18n} 
          me={props.me}
          project={project} 
          onInvitiationSent={onInvitationSent} 
          onInvitiationError={onInvitationError} />

        <MembersTable 
          i18n={props.i18n}
          groups={project.groups} 
          invitations={props.invitations}
          onChangeGroup={onChangeGroup} 
          onDeleteMember={onDeleteMember} 
          onDeleteMemberError={onDeleteError} />

        <Toast
          content={error}
          onOpenChange={open => !open && setError(null)} />
      </ToastProvider>
    </div>
  )

}