import {
  Avatar,
  Center,
  FileButton,
  Loader,
  Overlay,
  UnstyledButton,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconCamera } from '@tabler/icons-react';
import { useAvatarUpdate } from '@/features/profile/hooks/use-avatar-update';
import type { ProfileResponseBody } from '@/features/profile/types';
import { constructImageUrl } from '@/utils/helpers';
import cls from './styles.module.css';

export function ProfileAvatar({ profile }: { profile: ProfileResponseBody }) {
  const { hovered, ref } = useHover();
  const updateImageMut = useAvatarUpdate();

  const handleChange = (file: File | null) => {
    if (file) {
      updateImageMut.mutate(file);
    }
  };

  return (
    <FileButton onChange={handleChange}>
      {(props) => (
        <UnstyledButton ref={ref} className={cls.root} {...props}>
          <Avatar
            name={profile.name}
            className={cls.avatar}
            src={constructImageUrl(profile.avatar?.key)}
          />

          {updateImageMut.isPending && (
            <Overlay backgroundOpacity={0.75}>
              <Center h="100%">
                <Loader color="gray.4" />
              </Center>
            </Overlay>
          )}

          {hovered && !updateImageMut.isPending && (
            <Overlay backgroundOpacity={0.75} className={cls.cameraOverlay}>
              <Center h="100%">
                <IconCamera className={cls.cameraIcon} />
              </Center>
            </Overlay>
          )}
        </UnstyledButton>
      )}
    </FileButton>
  );
}
