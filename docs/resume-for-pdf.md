---
layout: null
---
# 職務経歴書

**最終更新日**: {{ 'now' | date: "%Y/%m/%d" }}

## 基本情報

| Key | Value |
| --- | --- |
| 名前 | {{ site.data.resume.personal.name }}（{{ site.data.resume.personal.name_en }}） |
| 職種 | {{ site.data.resume.personal.role }} |
| 所属 | {{ site.data.resume.personal.company }} |
| 所在地 | {{ site.data.resume.personal.location }} |

## 業務経験概要

{{ site.data.resume.personal.summary }}

{% for point in site.data.resume.personal.summary_points %}
- {{ point }}
{% endfor %}

## 職務経歴

{% for job in site.data.resume.experience %}
### {{ job.company }}

**期間**: {{ job.period }}  
**役職**: {{ job.role }}  
{% if job.description %}**概要**: {{ job.description }}{% endif %}

{% for project in job.projects %}
#### {{ project.name }}
{% if project.period %}
**期間**: {{ project.period }}
{% endif %}
{% if project.description %}
{{ project.description }}
{% endif %}

{% if project.responsibilities %}
**担当業務**:
{% for responsibility in project.responsibilities %}
- {{ responsibility }}
{% endfor %}
{% endif %}

{% endfor %}
{% endfor %}

## スキル・技術

### Amazon Web Services

{% for skill in site.data.resume.skills.aws %}
#### {{ skill.category }}
{% for service in skill.services %}{{ service }}{% unless forloop.last %} / {% endunless %}{% endfor %}

{% endfor %}

### その他の技術

{% for skill in site.data.resume.skills.other %}
#### {{ skill.category }}
{% for service in skill.services %}{{ service }}{% unless forloop.last %} / {% endunless %}{% endfor %}

{% endfor %}

## 保有資格

### AWS認定資格

| 資格名 | 取得日 |
| --- | --- |
{% for cert in site.data.resume.certifications.aws %}| AWS Certified {{ cert.name }} | {{ cert.date }} |
{% endfor %}

{% if site.data.resume.certifications.other %}
### その他の資格

| 資格名 | 取得日 | 発行機関 |
| --- | --- | --- |
{% for cert in site.data.resume.certifications.other %}| {{ cert.name }} | {{ cert.date }} | {{ cert.provider }} |
{% endfor %}
{% endif %}

## 表彰・認定

{% for award in site.data.resume.awards %}
- **{{ award.name }}** ({{ award.year }}){% if award.description %}: {{ award.description }}{% endif %}
{% endfor %}

## 個人活動

### 登壇・発表

{% for speaking in site.data.resume.activities.speaking %}
- **{{ speaking.event }}**: {{ speaking.title }}
  - 資料: {{ speaking.url }}
{% endfor %}

### 執筆・ブログ

{% for writing in site.data.resume.activities.writing %}
- **{{ writing.platform }}**: {{ writing.description }}
  - {{ writing.url }}
{% endfor %}

---

*この職務経歴書は {{ site.url }}{{ site.baseurl }} から生成されました。*