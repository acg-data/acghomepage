# WordPress Setup Guide for Aryo Consulting Group

This guide explains how to configure WordPress as a headless CMS backend for the Aryo Consulting Group website.

## Prerequisites

- WordPress 5.9+ installed (e.g., on SiteGround at aryocg.com)
- Advanced Custom Fields (ACF) Pro plugin installed and activated
- ACF to REST API plugin installed and activated (or ACF Pro 6.1+ which includes REST API support)

## Environment Configuration

Set the `VITE_WORDPRESS_URL` environment variable in Replit to point to your WordPress installation:

```
VITE_WORDPRESS_URL=https://cms.aryocg.com
```

If the main domain (aryocg.com) points to the Replit deployment, WordPress should be on a subdomain like `cms.aryocg.com`.

## Custom Post Types

Register the following custom post types in your WordPress theme's `functions.php` or via a custom plugin:

### 1. Case Studies (`case_study`)

```php
register_post_type('case_study', [
    'labels' => ['name' => 'Case Studies', 'singular_name' => 'Case Study'],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
    'has_archive' => true,
    'rewrite' => ['slug' => 'case-studies'],
]);
```

**ACF Fields:**
| Field Name | Field Type | Description |
|---|---|---|
| `client` | Text | Client company name |
| `industry` | Text | Industry sector |
| `challenge` | Textarea | The business challenge |
| `solution` | Textarea | Aryo's solution |
| `results` | Textarea | Engagement results |
| `value_unlocked` | Text | Value metric (e.g., "$47M", "+62% Revenue") |
| `featured` | True/False | Featured on homepage |
| `pdf_download` | URL | Link to downloadable PDF |
| `stats` | Repeater | Key statistics |
| `stats > label` | Text | Stat label (e.g., "Website Traffic") |
| `stats > value` | Text | Stat value (e.g., "+58%") |

### 2. Testimonials (`testimonial`)

```php
register_post_type('testimonial', [
    'labels' => ['name' => 'Testimonials', 'singular_name' => 'Testimonial'],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'custom-fields', 'page-attributes'],
    'has_archive' => false,
]);
```

**ACF Fields:**
| Field Name | Field Type | Description |
|---|---|---|
| `quote` | Textarea | The testimonial quote |
| `author_name` | Text | Person's full name |
| `author_title` | Text | Person's title and company |

### 3. Team Members (`team_member`)

```php
register_post_type('team_member', [
    'labels' => ['name' => 'Team Members', 'singular_name' => 'Team Member'],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields', 'page-attributes'],
    'has_archive' => false,
]);
```

**ACF Fields:**
| Field Name | Field Type | Description |
|---|---|---|
| `job_title` | Text | Job title (e.g., "Founder & CEO") |
| `bio` | Textarea | Short biography |

### 4. Open Positions (`position`)

```php
register_post_type('position', [
    'labels' => ['name' => 'Positions', 'singular_name' => 'Position'],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'excerpt', 'custom-fields'],
    'has_archive' => true,
]);
```

**ACF Fields:**
| Field Name | Field Type | Description |
|---|---|---|
| `location` | Text | Office location (e.g., "Boston / New York") |
| `employment_type` | Text | Type (e.g., "Full-time") |
| `description` | Textarea | Role description |
| `requirements` | Repeater | Job requirements |
| `requirements > requirement` | Text | Individual requirement |

### 5. Capabilities (`capability`)

```php
register_post_type('capability', [
    'labels' => ['name' => 'Capabilities', 'singular_name' => 'Capability'],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'excerpt', 'custom-fields', 'page-attributes'],
    'has_archive' => false,
]);
```

**ACF Fields:**
| Field Name | Field Type | Description |
|---|---|---|
| `subtitle` | Text | Subtitle (e.g., "End-to-End Transaction Support") |
| `description` | Textarea | Full description |
| `services` | Repeater | List of services |
| `services > service` | Text | Individual service name |
| `outcome` | Text | Typical outcome metric |
| `link` | Text | Internal page link |
| `icon_name` | Text | Lucide icon name (e.g., "TrendingUp", "Layers") |

### 6. Industries (`industry`)

```php
register_post_type('industry', [
    'labels' => ['name' => 'Industries', 'singular_name' => 'Industry'],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'excerpt', 'custom-fields', 'page-attributes'],
    'has_archive' => false,
]);
```

**ACF Fields:**
| Field Name | Field Type | Description |
|---|---|---|
| `description` | Textarea | Industry description |
| `clients` | Repeater | Client types list |
| `clients > item` | Text | Client type |
| `expertise` | Repeater | Expertise areas list |
| `expertise > item` | Text | Expertise area |
| `metric` | Text | Track record metric |
| `icon_name` | Text | Lucide icon name |

## Standard Posts (Blog/Insights)

Blog posts use the standard WordPress `post` type. Add these ACF fields:

| Field Name | Field Type | Description |
|---|---|---|
| `author_title` | Text | Author's professional title |
| `category` | Text | Display category (or use WP categories) |

## Pages with ACF

### Homepage (`homepage` slug)

**ACF Fields:**
| Field Name | Field Type | Description |
|---|---|---|
| `stats` | Repeater | Homepage statistics |
| `stats > value` | Number | Numeric value |
| `stats > suffix` | Text | Suffix (e.g., "+", "%", ".5B") |
| `stats > label` | Text | Label text |

## CORS Configuration

If WordPress is on a different domain/subdomain, add CORS headers. Add to your theme's `functions.php`:

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = [
            'https://aryocg.com',
            'https://www.aryocg.com',
            // Add your Replit dev URL here during development
        ];
        
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        }
        
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        header('Access-Control-Allow-Credentials: true');
        
        return $value;
    });
});
```

## REST API Verification

After setup, verify the REST API is accessible:

```
GET https://cms.aryocg.com/wp-json/wp/v2/posts?_embed=1
GET https://cms.aryocg.com/wp-json/wp/v2/case_study?_embed=1
GET https://cms.aryocg.com/wp-json/wp/v2/testimonial?_embed=1
GET https://cms.aryocg.com/wp-json/wp/v2/team_member?_embed=1
GET https://cms.aryocg.com/wp-json/wp/v2/position?_embed=1
GET https://cms.aryocg.com/wp-json/wp/v2/capability?_embed=1
GET https://cms.aryocg.com/wp-json/wp/v2/industry?_embed=1
GET https://cms.aryocg.com/wp-json/wp/v2/pages?slug=homepage&_embed=1
```

## Fallback Behavior

The React frontend automatically falls back to hardcoded content when:
- `VITE_WORDPRESS_URL` is not set
- The WordPress API is unreachable
- A specific content type returns no results

This means the site always works, even without WordPress configured.

## Content Migration

To migrate existing hardcoded content to WordPress:

1. Create each custom post type entry in WordPress admin
2. Fill in the ACF fields matching the field names above
3. Set the `VITE_WORDPRESS_URL` environment variable
4. The frontend will automatically use WordPress data when available
5. Hardcoded fallback data remains as a safety net
