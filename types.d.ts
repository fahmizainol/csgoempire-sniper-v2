// types.d.ts

export type DepositorStats = {
  delivery_rate_recent: number;
  delivery_rate_long: number;
  delivery_time_minutes_recent: number;
  delivery_time_minutes_long: number;
  steam_level_min_range: number;
  steam_level_max_range: number;
  user_has_trade_notifications_enabled: boolean;
  user_online_status: number;
};

export type ItemSearch = {
  category: string;
  type: string | null;
  sub_type: string | null;
  rarity: string;
};

export type AuctionItemNew = {
  auction_ends_at: string | null;
  auction_highest_bid: number | null;
  auction_highest_bidder: string | null;
  auction_number_of_bids: number;
  blue_percentage: number | null;
  fade_percentage: number | null;
  icon_url: string;
  is_commodity: boolean;
  market_name: string;
  market_value: number;
  name_color: string;
  preview_id: string;
  price_is_unreliable: boolean;
  stickers: any[];
  suggested_price: number;
  wear: number;
  published_at: string;
  id: string;
  depositor_stats: DepositorStats;
  above_recommended_price: number;
  purchase_price: number;
  item_search: ItemSearch;
  wear_name: string;
};

export type AuctionItemUpdate = {
  id: string;
  above_recommended_price: number;
  auction_highest_bid: number;
  auction_highest_bidder: number;
  auction_number_of_bids: number;
  auction_ends_at: number; // Since it's a timestamp, we can keep it as a number
};

export type AuctionItemNewResponse = {
  success: boolean;
  auction_data: AuctionItemUpdate;
};
