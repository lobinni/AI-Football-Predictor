import { useState } from 'react';
import { Newspaper, Clock, TrendingUp, AlertCircle, Users, Activity, ChevronRight, Search, Filter } from 'lucide-react';
import { newsArticles, NewsArticle, formatTimeAgo, getLatestNews, getFeaturedNews } from '../data/news';

const categoryConfig = {
  breaking: { label: 'Breaking', color: 'bg-red-500', icon: AlertCircle },
  transfer: { label: 'Transfer', color: 'bg-purple-500', icon: TrendingUp },
  match: { label: 'Match', color: 'bg-green-500', icon: Activity },
  injury: { label: 'Injury', color: 'bg-orange-500', icon: Users },
  analysis: { label: 'Analysis', color: 'bg-blue-500', icon: Newspaper },
};

export function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const featuredNews = getFeaturedNews();
  const latestNews = getLatestNews();

  const filteredNews = latestNews.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All News', count: newsArticles.length },
    { id: 'breaking', label: 'Breaking', count: newsArticles.filter(n => n.category === 'breaking').length },
    { id: 'transfer', label: 'Transfers', count: newsArticles.filter(n => n.category === 'transfer').length },
    { id: 'match', label: 'Matches', count: newsArticles.filter(n => n.category === 'match').length },
    { id: 'analysis', label: 'Analysis', count: newsArticles.filter(n => n.category === 'analysis').length },
    { id: 'injury', label: 'Injuries', count: newsArticles.filter(n => n.category === 'injury').length },
  ];

  if (selectedArticle) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to News
        </button>

        {/* Article View */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="aspect-video relative">
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`${categoryConfig[selectedArticle.category].color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {categoryConfig[selectedArticle.category].label}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <span>{selectedArticle.sourceIcon}</span>
                {selectedArticle.source}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTimeAgo(selectedArticle.publishedAt)}
              </span>
              <span>{selectedArticle.readTime} min read</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {selectedArticle.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {selectedArticle.summary}
            </p>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{selectedArticle.content}</p>
              <p className="mt-4">
                This is a demo article. In a production environment, this would contain the full 
                article content fetched from a news API or CMS.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
              {selectedArticle.tags.map(tag => (
                <span 
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Newspaper className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Football News</h2>
            <p className="text-red-100">Latest updates from the world of football</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news, teams, players..."
            className="w-full bg-white/20 text-white placeholder-white/50 pl-12 pr-4 py-3 rounded-xl border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>
      </div>

      {/* Featured News */}
      {featuredNews.length > 0 && selectedCategory === 'all' && searchQuery === '' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Featured Stories
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {featuredNews.slice(0, 2).map((article) => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className={`${categoryConfig[article.category].color} text-white px-2 py-0.5 rounded text-xs font-medium`}>
                      {categoryConfig[article.category].label}
                    </span>
                    <h4 className="text-white font-bold mt-2 line-clamp-2 group-hover:underline">
                      {article.title}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{article.sourceIcon} {article.source}</span>
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Categories</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
              <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">
            {selectedCategory === 'all' ? 'Latest News' : `${categories.find(c => c.id === selectedCategory)?.label}`}
          </h3>
          <span className="text-sm text-gray-500">{filteredNews.length} articles</span>
        </div>
        
        {filteredNews.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Newspaper className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No articles found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredNews.map((article) => {
              const CategoryIcon = categoryConfig[article.category].icon;
              
              return (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex gap-4"
                >
                  {/* Thumbnail */}
                  <div className="shrink-0 w-24 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`${categoryConfig[article.category].color} text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1`}>
                        <CategoryIcon className="w-3 h-3" />
                        {categoryConfig[article.category].label}
                      </span>
                      {article.featured && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-red-600 transition-colors">
                      {article.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 hidden md:block">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span>{article.sourceIcon}</span>
                        {article.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                      <span className="hidden sm:inline">{article.readTime} min read</span>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="hidden md:flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Live Ticker */}
      <div className="bg-gray-900 rounded-2xl p-4 text-white overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Live Updates</span>
          </span>
        </div>
        <div className="overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {newsArticles.slice(0, 5).map((article, i) => (
              <span key={article.id} className="inline-block mr-12">
                <span className="text-red-400">{article.sourceIcon}</span>
                <span className="ml-2 text-gray-300">{article.title}</span>
                {i < 4 && <span className="mx-6 text-gray-600">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
