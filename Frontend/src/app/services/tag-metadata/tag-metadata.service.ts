import { Injectable } from '@angular/core';
import { ReviewTag } from 'src/app/models/review-tag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagMetadataService {
  tags: ReviewTag[];

  constructor() {
    this.tags = [];

    this.tags.push(
      {
        names: ['18+'],
        display: '18+',
        icon: 'fa-solid fa-user-large-slash',
        title: 'Adults Only',
        tooltipText: 'This venue is intended for adult audiences.',
        color: 'bg-red-700',
        position: 3
      },
      {
        names: ['nsfw'],
        display: 'NSFW',
        icon: 'fa-solid fa-triangle-exclamation',
        title: 'Not Safe For Work',
        tooltipText: 'This venue may promote sensitive content.',
        color: 'bg-red-700',
        position: 4
      },
      {
        names: ['erp'],
        display: 'ERP',
        icon: 'fa-solid fa-bed',
        title: 'Erotic Role-play',
        tooltipText: 'This venue may promote intimate encounters.',
        color: 'bg-red-700',
        position: 4
      },
      {
        names: ['sfw'],
        display: 'SFW',
        icon: 'fa-solid fa-child-reaching',
        title: 'Safe For Work',
        tooltipText: 'This venue is safe for general audiences.',
        color: 'bg-green-700',
        position: 4
      },
      {
        names: ['exclusive access'],
        display: 'Exclusive Access',
        icon: 'fa-solid fa-id-badge',
        title: 'Exclusive Access',
        tooltipText: 'We received exclusive access or privileges for this review.',
        color: 'bg-green-600',
        position: 2
      },
      {
        names: ['lgbt', 'lgbt+', 'lgbtq', 'lgbtq+', 'lgbtqia', 'lgbtqia+'],
        display: 'LGBT+',
        icon: 'fa-solid fa-heart',
        title: 'LGBT+ Friendly',
        tooltipText: 'This venue identifies as LGBT+ friendly.',
        color: 'bg-pink-600'
      },
      {
        names: ['sponsored'],
        display: 'Sponsored',
        icon: 'fa-solid fa-dollar-sign',
        title: 'Sponsored Review',
        tooltipText: 'We received compensation or perks for this review.',
        color: 'bg-yellow-500',
        position: 1
      },
      {
        names: ['new review'],
        display: 'New Review',
        icon: 'fa-solid fa-star',
        title: 'New Review',
        tooltipText: 'This review is fresh from our team!',
        color: 'bg-green-700'
      },
      {
        names: ['old review'],
        display: 'Old Review',
        icon: 'fa-solid fa-clock',
        title: 'Expiring Review',
        tooltipText: 'This review is a few months old and may not be accurate anymore.',
        color: 'bg-red-700'
      },
      {
        names: ['twitch dj'],
        display: 'Twitch DJ',
        icon: 'fa-solid fa-music',
        title: 'Twitch DJ',
        tooltipText: 'Listen to live music curated by a DJ.',
        color: 'bg-purple-700'
      },
      {
        names: ['nightclub'],
        display: 'Nightclub',
        icon: 'fa-solid fa-martini-glass',
        title: 'Nightclub',
        tooltipText: 'Often features a dance floor, music, and bar services.',
        color: 'bg-fuchsia-500',
        position: 5
      },
      {
        names: ['host club'],
        display: 'Host Club',
        icon: 'fa-solid fa-people-group',
        title: 'Host Club',
        tooltipText: 'Rent a Host to accompany you for the evening.',
        color: 'bg-fuchsia-500',
        position: 5
      },
      {
        names: ['cafe'],
        display: 'Cafe',
        icon: 'fa-solid fa-mug-saucer',
        title: 'Cafe',
        tooltipText: 'A venue that focuses on food and beverage service.',
        color: 'bg-fuchsia-500',
        position: 5
      },
      {
        names: ['vip'],
        display: 'VIP',
        icon: 'fa-solid fa-crown',
        title: 'VIP Experiences',
        tooltipText: 'This venue offers a VIP experience for an additional cost.',
        color: 'bg-sky-500'
      },
      {
        names: ['auctions'],
        display: 'Auctions',
        icon: 'fa-solid fa-gavel',
        title: 'Hosting Auctions',
        tooltipText: 'Participate in auctions for items, gil, or other prizes.',
        color: 'bg-violet-500'
      },
      {
        names: ['raffles'],
        display: 'Raffles',
        icon: 'fa-solid fa-ticket',
        title: 'Hosting Raffles',
        tooltipText: 'Participate in raffles for items, gil, and other prizes.',
        color: 'bg-violet-500'
      },
      {
        names: ['rp'],
        display: 'RP',
        icon: 'fa-solid fa-quote-left',
        title: 'Role-play',
        tooltipText: 'Role-playing is a key component for this venue.',
        color: 'bg-emerald-600'
      }
    );
  }

  determineTagIcon(tag: string): string {
    return this.getTag(tag)?.icon;
  }

  determineTagTooltip(tag: string): string {
    return this.getTag(tag)?.tooltipText;
  }

  determineTagTitle(tag: string): string {
    return this.getTag(tag)?.title;
  }

  determineTagColor(tag: string): string {
    return this.getTag(tag)?.color || 'bg-gray-400';
  }

  getTag(tagName: string): ReviewTag {
    for (var i = 0; i < this.tags.length; i++) {
      var tagItem = this.tags[i];

      if (tagItem.names.includes(tagName.toLowerCase())) {
        return tagItem;
      }
    }

    return null;
  }
}
