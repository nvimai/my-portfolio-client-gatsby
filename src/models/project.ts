export type ProjectType = {
    excerpt: string;
    fields: {
        slug: string;
    }
    frontmatter: {
        startdate: string;
        present: boolean;
        date: string;
        title: string;
        description: string;
        position: string;
        location: string;
        categories: string[];
        tags: string[];
        image: string;
    }
}