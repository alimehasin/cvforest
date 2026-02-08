import { Button } from '@mantine/core';
import { IconAlertCircle, IconEye, IconUpload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link/link';
import type { CvBody } from '@/features/accounts/types';

interface CvButtonProps {
  cv: CvBody | null;
}

export function CvButton({ cv }: CvButtonProps) {
  const t = useTranslations();

  if (!cv) {
    return (
      <Button
        href="/upload-cv"
        variant="filled"
        component={Link}
        leftSection={<IconUpload size={18} />}
      >
        {t('header.uploadCv')}
      </Button>
    );
  }

  switch (cv.status) {
    case 'Pending': {
      return (
        <Button
          color="yellow"
          variant="filled"
          component={Link}
          href={`/cvs/${cv.id}`}
          leftSection={<IconEye size={18} />}
        >
          {t('header.cvUnderReview')}
        </Button>
      );
    }

    case 'Approved': {
      return (
        <Button
          color="green"
          variant="light"
          component={Link}
          href={`/cvs/${cv.id}`}
          leftSection={<IconEye size={18} />}
        >
          {t('header.cvApproved')}
        </Button>
      );
    }

    case 'Rejected': {
      return (
        <Button
          color="red"
          variant="light"
          component={Link}
          href={`/cvs/${cv.id}`}
          leftSection={<IconAlertCircle size={18} />}
        >
          {t('header.cvRejected')}
        </Button>
      );
    }
  }
}
