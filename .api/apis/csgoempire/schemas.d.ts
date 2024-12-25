declare const GetActiveAuctions: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
                readonly active_auctions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly auction_ends_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1666083221];
                            };
                            readonly auction_highest_bid: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [227];
                            };
                            readonly auction_highest_bidder: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [303119];
                            };
                            readonly auction_number_of_bids: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1];
                            };
                            readonly custom_price_percentage: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly icon_url: {
                                readonly type: "string";
                                readonly examples: readonly ["-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNTPcUmqBwTTR7SQb37g5vWCwlxdFEC5uyncgZi0vGQJWwQudm0xtTexaD2ZOmClyVB5sL8h7mCHA"];
                            };
                            readonly is_commodity: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [true];
                            };
                            readonly market_name: {
                                readonly type: "string";
                                readonly examples: readonly ["Name Tag"];
                            };
                            readonly market_value: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [227];
                            };
                            readonly name_color: {
                                readonly type: "string";
                                readonly examples: readonly ["D2D2D2"];
                            };
                            readonly preview_id: {};
                            readonly price_is_unreliable: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [true];
                            };
                            readonly stickers: {
                                readonly type: "array";
                                readonly items: {};
                            };
                            readonly wear: {};
                            readonly published_at: {
                                readonly type: "string";
                                readonly examples: readonly ["2022-10-18T08:51:02.803761Z"];
                            };
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [11204];
                            };
                            readonly depositor_stats: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly delivery_rate_recent: {
                                        readonly type: "number";
                                        readonly default: 0;
                                        readonly examples: readonly [0.6];
                                    };
                                    readonly delivery_rate_long: {
                                        readonly type: "number";
                                        readonly default: 0;
                                        readonly examples: readonly [0.7567567567567568];
                                    };
                                    readonly delivery_time_minutes_recent: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [7];
                                    };
                                    readonly delivery_time_minutes_long: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [7];
                                    };
                                    readonly steam_level_min_range: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [5];
                                    };
                                    readonly steam_level_max_range: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [10];
                                    };
                                    readonly user_has_trade_notifications_enabled: {
                                        readonly type: "boolean";
                                        readonly default: true;
                                        readonly examples: readonly [false];
                                    };
                                    readonly user_is_online: {};
                                };
                            };
                            readonly above_recommended_price: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [-5];
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetActiveTrades: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly deposits: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [11203];
                                    };
                                    readonly service_name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["csgoempire"];
                                    };
                                    readonly service_invoice_id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [920];
                                    };
                                    readonly user_id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [303119];
                                    };
                                    readonly item_id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [50755];
                                    };
                                    readonly items: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly asset_id: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [26876810352];
                                                };
                                                readonly created_at: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["2022-10-14 13:54:35"];
                                                };
                                                readonly custom_price_percentage: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly full_position: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [83];
                                                };
                                                readonly icon_url: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjwN6vQglRd4cJ5nqeQ89mk2VHg_UpkYjj0JdLGdAFvNAvS81G6kLjq1pHtv5SdnHdhuCYq-z-DyHWIya-0"];
                                                };
                                                readonly id: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [50755];
                                                };
                                                readonly is_commodity: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [false];
                                                };
                                                readonly market_name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["★ M9 Bayonet | Forest DDPAT (Factory New)"];
                                                };
                                                readonly market_value: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [488.82];
                                                };
                                                readonly name_color: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["8650AC"];
                                                };
                                                readonly position: {};
                                                readonly preview_id: {};
                                                readonly price_is_unreliable: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [1];
                                                };
                                                readonly tradable: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [true];
                                                };
                                                readonly tradelock: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [false];
                                                };
                                                readonly updated_at: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["2022-10-18 08:46:45"];
                                                };
                                                readonly wear: {};
                                            };
                                        };
                                    };
                                    readonly total_value: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [48882];
                                    };
                                    readonly security_code: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly tradeoffer_id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                    readonly trade_id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [2];
                                    };
                                    readonly status: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [2];
                                    };
                                    readonly status_message: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly metadata: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly auction_highest_bid: {};
                                            readonly auction_highest_bidder: {};
                                            readonly auction_number_of_bids: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [0];
                                            };
                                            readonly auction_ends_at: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [1666083002];
                                            };
                                            readonly auction_auto_withdraw_failed: {};
                                            readonly price_updated_at: {};
                                            readonly trade_url: {};
                                            readonly partner: {};
                                            readonly total_fee: {};
                                            readonly fee: {};
                                            readonly old_total_value: {};
                                            readonly item_position_in_inventory: {};
                                            readonly item_inspected: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [true];
                                            };
                                            readonly expires_at: {};
                                            readonly delivery_time: {};
                                            readonly phishingScamDetected: {};
                                            readonly item_validation: {};
                                            readonly penalty: {};
                                        };
                                    };
                                    readonly item_hash: {
                                        readonly type: "string";
                                        readonly examples: readonly ["7d1cacdc3016c134e284ae253543cc3b0fd63942"];
                                    };
                                    readonly created_at: {
                                        readonly type: "string";
                                        readonly examples: readonly ["2022-10-18 08:47:02"];
                                    };
                                    readonly updated_at: {
                                        readonly type: "string";
                                        readonly examples: readonly ["2022-10-18 08:47:02"];
                                    };
                                };
                            };
                        };
                        readonly withdrawals: {
                            readonly type: "array";
                            readonly items: {};
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Metadata: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly user: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [303119];
                        };
                        readonly steam_id: {
                            readonly type: "string";
                            readonly examples: readonly ["76561198106192114"];
                        };
                        readonly steam_id_v3: {
                            readonly type: "string";
                            readonly examples: readonly ["145926386"];
                        };
                        readonly steam_name: {
                            readonly type: "string";
                            readonly examples: readonly ["Artemis"];
                        };
                        readonly avatar: {
                            readonly type: "string";
                            readonly examples: readonly ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4f/4f619bc788f0d41261d2a5ced0e96a281af88479_full.jpg"];
                        };
                        readonly profile_url: {
                            readonly type: "string";
                            readonly examples: readonly ["https://steamcommunity.com/id/G0FastMen/"];
                        };
                        readonly registration_timestamp: {
                            readonly type: "string";
                            readonly examples: readonly ["2016-07-27 23:20:03"];
                        };
                        readonly registration_ip: {
                            readonly type: "string";
                            readonly examples: readonly ["0.0.0.0"];
                        };
                        readonly last_login: {
                            readonly type: "string";
                            readonly examples: readonly ["2021-11-29 13:02:54"];
                        };
                        readonly balance: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_profit: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_bet: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly betback_total: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly bet_threshold: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_trades: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_deposit: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_withdraw: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly withdraw_limit: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly csgo_playtime: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly last_csgo_playtime_cache: {
                            readonly type: "string";
                            readonly examples: readonly ["2016-07-27 23:20:03"];
                        };
                        readonly trade_url: {
                            readonly type: "string";
                            readonly examples: readonly ["https://steamcommunity.com/tradeoffer/new/?partner=145926386&token=ABCDEF"];
                        };
                        readonly trade_offer_token: {
                            readonly type: "string";
                            readonly examples: readonly ["ABCDEF"];
                        };
                        readonly ref_id: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_referral_bet: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_referral_commission: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly ref_permission: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly ref_earnings: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_ref_earnings: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_ref_count: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_credit: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly referral_code: {
                            readonly type: "string";
                            readonly examples: readonly ["Artemis"];
                        };
                        readonly referral_amount: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [50];
                        };
                        readonly muted_until: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [1632354690];
                        };
                        readonly mute_reason: {
                            readonly type: "string";
                            readonly examples: readonly ["Other"];
                        };
                        readonly admin: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly super_mod: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly mod: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly utm_campaign: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly country: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly is_vac_banned: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [2];
                        };
                        readonly steam_level: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [343];
                        };
                        readonly last_steam_level_cache: {
                            readonly type: "string";
                            readonly examples: readonly ["2021-11-30 07:41:07"];
                        };
                        readonly whitelisted: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [1];
                        };
                        readonly total_tips_received: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_tips_sent: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly withdrawal_fee_owed: {
                            readonly type: "string";
                            readonly examples: readonly ["0.0000"];
                        };
                        readonly flags: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly ban: {};
                        readonly balances: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly level: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly xp: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly socket_token: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly user_hash: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly hashed_server_seed: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly intercom_hash: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly roles: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly eligible_for_free_case: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [false];
                        };
                        readonly extra_security_type: {
                            readonly type: "string";
                            readonly examples: readonly ["2fa"];
                        };
                        readonly total_bet_skincrash: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_bet_matchbetting: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_bet_roulette: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_bet_coinflip: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly total_bet_supershootout: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [0];
                        };
                        readonly p2p_telegram_notifications_allowed: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [true];
                        };
                        readonly p2p_telegram_notifications_enabled: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [true];
                        };
                        readonly verified: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [false];
                        };
                        readonly hide_verified_icon: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [false];
                        };
                        readonly unread_notifications: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly last_session: {
                            readonly type: "object";
                            readonly properties: {};
                        };
                        readonly email: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly email_verified: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [false];
                        };
                        readonly eth_deposit_address: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly btc_deposit_address: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly ltc_deposit_address: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly bch_deposit_address: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly steam_inventory_url: {
                            readonly type: "string";
                            readonly examples: readonly ["https://steamcommunity.com/profiles/76561198106192114/inventory/#730"];
                        };
                        readonly steam_api_key: {
                            readonly type: "string";
                            readonly examples: readonly [""];
                        };
                        readonly has_crypto_deposit: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [true];
                        };
                        readonly chat_tag: {
                            readonly type: "object";
                            readonly properties: {};
                        };
                        readonly linked_accounts: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly api_token: {
                            readonly type: "string";
                            readonly examples: readonly ["nice try"];
                        };
                    };
                };
                readonly socket_token: {
                    readonly type: "string";
                    readonly examples: readonly [""];
                };
                readonly socket_signature: {
                    readonly type: "string";
                    readonly examples: readonly [""];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Settings: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly RAW_BODY: {
                readonly type: "string";
                readonly description: "{\"trade_url\":\"full_trade_url_here\"}";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
                readonly escrow_seconds: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [0];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const TransactionHistory: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Insert the requested page number here.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { GetActiveAuctions, GetActiveTrades, Metadata, Settings, TransactionHistory };
