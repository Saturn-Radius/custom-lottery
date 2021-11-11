import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'FastSwap',
  description:
    'The most popular AMM on BSC by user count! Earn FAST through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by FastSwap), NFTs, and more, on a platform you can trust.',
  // image: 'https://Fastswap.finance/images/hero.png',
  image: '',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('FastSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('FastSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('FastSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('FastSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('FastSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('FastSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('FastSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('FastSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('FastSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('FastSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('FastSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('FastSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('FastSwap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('FastSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('FastSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('FastSwap')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('FastSwap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('FastSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('FastSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('FastSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('FastSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('FastSwap Info & Analytics')}`,
        description: 'View statistics for Fastswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('FastSwap Info & Analytics')}`,
        description: 'View statistics for Fastswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Pools')} | ${t('FastSwap Info & Analytics')}`,
        description: 'View statistics for Fastswap exchanges.',
      }
    default:
      return null
  }
}
