import { Grid, Container, lighten, useTheme, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Facebook, Instagram, LinkedIn, YouTube } from '@mui/icons-material'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import ExternalLink from 'components/common/ExternalLink'
import { routes, socialUrls, staticUrls } from 'common/routes'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}
const footerItems: FooterLink[][] = [
  [
    { label: 'components.footer.about-us', href: routes.about },
    { label: 'components.footer.about-project', href: routes.aboutProject },
    { label: 'components.footer.support', href: routes.support },
    { label: 'components.footer.contact', href: routes.contact },
    { external: true, label: 'nav.blog', href: staticUrls.blog },
  ],
  [
    { external: true, label: 'GitHub', href: staticUrls.github },
    { external: true, label: 'components.footer.docs', href: staticUrls.projectDocs },
    { external: true, label: 'components.footer.dev-docs', href: staticUrls.devDocs },
  ],
  [
    { label: 'components.footer.privacy-policy', href: routes.privacyPolicy },
    { label: 'components.footer.terms-of-service', href: routes.termsOfService },
  ],
]

export default function Footer() {
  return (
    <Container
      component="footer"
      maxWidth={false}
      disableGutters
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.dark,
        color: lighten(theme.palette.primary.main, 0.75),
        '& a': {
          color: lighten(theme.palette.primary.main, 0.75),
          '&:hover': {
            color: lighten(theme.palette.primary.main, 0.55),
          },
        },
      })}>
      <Container maxWidth="lg" disableGutters>
        <Grid
          container
          sx={(theme) => ({
            xs: {
              textAlign: 'center',
              padding: theme.spacing(5, 0),
            },
            textAlign: 'left',
            padding: theme.spacing(5),
          })}>
          <Grid item xs={12} sm={8} md={5}>
            <InfoGrid />
          </Grid>
          <Grid item xs={12} sm={4} md={7}>
            <FooterLinks />
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

const InfoGrid = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Grid container direction="column" spacing={2} sx={{ sm: { pb: 3 } }}>
      <Grid item>
        <Link href={routes.index}>
          <a>
            <PodkrepiLogo locale={locale} size="large" variant="fixed" />
          </a>
        </Link>
      </Grid>
      <Grid item>
        <SocialIcons />
      </Grid>
      <Grid item>{t('components.footer.copyrights')}</Grid>
      <Grid item>
        {t('components.footer.hosting-partner')}{' '}
        <ExternalLink href={staticUrls.hostingProvider}>
          <strong>SuperHosting.BG</strong>
        </ExternalLink>
      </Grid>
      {process.env.APP_VERSION && (
        <Grid item>
          {t('components.footer.version')} v{process.env.APP_VERSION}
        </Grid>
      )}
    </Grid>
  )
}

const SocialIcons = () => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Grid direction="row" container spacing={2} justifyContent={sm ? 'flex-start' : 'center'}>
      <Grid item>
        <ExternalLink href={socialUrls.facebook}>
          <Facebook />
        </ExternalLink>
      </Grid>
      <Grid item>
        <ExternalLink href={socialUrls.linkedin}>
          <LinkedIn />
        </ExternalLink>
      </Grid>
      <Grid item>
        <ExternalLink href={socialUrls.youtube}>
          <YouTube />
        </ExternalLink>
      </Grid>
      <Grid item>
        <ExternalLink href={socialUrls.instagram}>
          <Instagram />
        </ExternalLink>
      </Grid>
    </Grid>
  )
}
const FooterLinks = () => {
  const { t } = useTranslation()
  return (
    <Grid container spacing={3}>
      {footerItems.map((links, column) => (
        <Grid key={column} item xs={12} md={4}>
          <Grid container direction="column" spacing={1}>
            {links.map(({ label, href, external }, row) => (
              <Grid key={`${column}-${row}`} item>
                {external ? (
                  <ExternalLink href={href}>{t(label)}</ExternalLink>
                ) : (
                  <Link href={href}>
                    <a>{t(label)}</a>
                  </Link>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
