import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Input,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blogData";
import { Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export const filteredPosts = blogPosts.filter((post) => {
  const matchesSearch =
    post.title.toLowerCase().includes("") ||
    post.content.toLowerCase().includes("");
  return matchesSearch;
});
export const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const EnhancedBlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showFullBlog =
    location.pathname === "#blog" || location.pathname === "/blog";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filter posts based on search and category

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {showFullBlog ? (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Header */}
          <motion.div
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={0}
          >
            <Box textAlign="center" py={4}>
              {/* <ArticleIcon sx={{ fontSize: 60, color: '#003366', mb: 2 }} /> */}

              <Typography
                variant="h2"
                sx={{ fontSize: 32, color: "#000000", mb: 2 }}
                component="h1"
                gutterBottom
                fontWeight="bold"
                color="primary"
              >
                Lex & Ledger Blog
              </Typography>
              <Typography variant="h6" sx={{ color: "#666" }}>
                Expert insights on legal and financial matters for your business
                success
              </Typography>
            </Box>
          </motion.div>

          <>
            {/* Search & Filter */}
            <Box
              sx={{
                // p: { xs: 2, sm: 3 },
                mb: 4,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              {/* Search Box */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#003366" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              {/* Category Tabs */}
              <Box>
                <Tabs
                  value={selectedCategory}
                  onChange={(e, newValue) => setSelectedCategory(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#003366",
                      height: 3,
                      borderRadius: 2,
                    },
                  }}
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 3,
                      minHeight: "auto",
                      mr: 1,
                    },
                    "& .Mui-selected": {
                      color: "#003366",
                      fontWeight: 600,
                    },
                    "& .MuiTabs-scrollButtons.Mui-disabled": {
                      opacity: 1, // default is 0.3, force to 1
                      pointerEvents: "auto", // optional: allow hover/click if needed
                    },
                  }}
                >
                  {categories.map((category) => (
                    <Tab key={category} value={category} label={category} />
                  ))}
                </Tabs>
              </Box>
            </Box>

            {/* Featured */}
            {filteredPosts.length > 0 && (
              <motion.div
                variants={sectionVariants}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card
                  sx={{ mb: 6, overflow: "hidden" }}
                  onClick={() =>
                    navigate(`/blogDetail/${filteredPosts[0]?.id}`)
                  }
                >
                  <Grid
                    container
                    alignItems={"center"}
                    sx={{ height: "400px" }}
                  >
                    <Grid item xs={12} md={6}>
                      <CardMedia
                        sx={{
                          height: "400px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        component="img"
                        height="300"
                        image={filteredPosts[0].image}
                        alt={filteredPosts[0].title}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CardContent
                        sx={{ p: 4, display: "flex", flexDirection: "column" }}
                      >
                        <Chip
                          label="Featured"
                          color="#003366"
                          size="small"
                          sx={{
                            mb: 2,
                            alignSelf: "flex-start",
                            color: "#003366",
                            fontSize: 14,
                            fontWeight: 500,
                            p: 2,
                            width: "50%",
                          }}
                        />
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          gutterBottom
                          color="#003366"
                        >
                          {filteredPosts[0].title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#ccc", mb: 3, flexGrow: 1 }}
                        >
                          {filteredPosts[0].excerpt}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body2" sx={{ color: "#ccc" }}>
                            {filteredPosts[0].author} • {filteredPosts[0].date}
                          </Typography>
                          <Chip
                            label={filteredPosts[0].category}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </motion.div>
            )}

            {/* Blog Grid */}
            <Grid container spacing={4}>
              {filteredPosts.slice(1).map((post, index) => (
                <Grid item xs={12} md={6} lg={4} key={post.id}>
                  <motion.div
                    variants={sectionVariants}
                    custom={index + 3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card
                      onClick={() => navigate(`/blogDetail/${post?.id}`)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        minHeight: 420,
                        borderRadius: 1,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={post.image}
                        alt={post.title}
                        sx={{ objectFit: "cover", height: 240 }}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          p: 3,
                          backgroundColor: "#fff",
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          gutterBottom
                          color="#003366"
                          sx={{
                            minHeight: 48,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#999",
                            mb: 1,
                            flexGrow: 1,
                            lineHeight: 1.6,
                            minHeight: 60,

                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {post.excerpt}
                        </Typography>
                        <Chip
                          label={post.category}
                          size="small"
                          variant="outlined"
                          color="#003366"
                          sx={{
                            my: 1,
                            // backgroundColor: '#003366',
                            color: "#003366",
                            fontWeight: 500,
                            px: 1,
                            py: 0.2,
                            width: "fit-content",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: "auto",
                          }}
                        >
                          <Typography variant="caption" sx={{ color: "#999" }}>
                            {post.readTime}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#999" }}>
                            {post.date}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <Box textAlign="center" py={8}>
                <Typography variant="h5" sx={{ color: "#ccc" }} gutterBottom>
                  No articles found
                </Typography>
                <Typography variant="body1" sx={{ color: "#ccc" }}>
                  Try adjusting your search terms or category filter
                </Typography>
              </Box>
            )}
          </>
        </Container>
      ) : (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Heading and View More */}
             <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Insights from Lex&Ledger

            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
  Stay updated with expert articles, legal updates, and financial guidance curated by our professionals to help you make informed decisions.
            </p>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              mb: 3,
            }}
          >
           
            <Button
              onClick={() => navigate("/blog")}
              variant="text"
              sx={{
                color: "#003366",
                fontWeight: 500,
                textTransform: "none",
                fontSize: "18px",
              }}
            >
              View More
            </Button>
          </Box>

          {/* Blog Cards Grid */}
          <Grid container spacing={4}>
            {filteredPosts.slice(0, 3).map((post, index) => (
              <Grid item xs={12} md={6} lg={4} key={post.id}>
                <motion.div
                  variants={sectionVariants}
                  custom={index + 3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card
                    onClick={() => navigate(`/blog/${post?.id}`)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      minHeight: 420,
                      borderRadius: 1,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={post.image}
                      alt={post.title}
                      sx={{ objectFit: "cover", height: 240 }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        backgroundColor: "#fff",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        color="#003366"
                        sx={{
                          minHeight: 48,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#999",
                          mb: 1,
                          flexGrow: 1,
                          lineHeight: 1.6,
                          minHeight: 60,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                      <Chip
                        label={post.category}
                        size="small"
                        variant="outlined"
                        sx={{
                          my: 1,
                          color: "#003366",
                          fontWeight: 500,
                          px: 1,
                          py: 0.2,
                          width: "fit-content",
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: "auto",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "#999" }}>
                          {post.readTime}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#999" }}>
                          {post.date}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default EnhancedBlogPage;
